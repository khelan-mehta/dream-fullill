
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  updateDoc,
  doc,
  getDoc,
  Timestamp,
  increment
} from "firebase/firestore";
import { db } from "./config";
import { getCurrentUser } from "./auth";

export interface WishData {
  id?: string;
  title: string;
  description: string;
  category: string;
  createdBy: {
    uid: string;
    name: string;
  };
  createdAt: Date | Timestamp;
  isFulfilled: boolean;
  likesCount: number;
}

export const createWish = async (data: Omit<WishData, "createdBy" | "createdAt" | "isFulfilled" | "likesCount">) => {
  const user = getCurrentUser();
  if (!user) throw new Error("User not authenticated");

  try {
    const wishData: Omit<WishData, "id"> = {
      ...data,
      createdBy: {
        uid: user.uid,
        name: user.displayName || "Anonymous"
      },
      createdAt: Timestamp.now(),
      isFulfilled: false,
      likesCount: 0
    };

    const docRef = await addDoc(collection(db, "wishes"), wishData);
    return {
      id: docRef.id,
      ...wishData
    };
  } catch (error: any) {
    throw new Error(`Failed to create wish: ${error.message}`);
  }
};

export const getWishes = async (filters?: {
  onlyFulfilled?: boolean;
  onlyOpen?: boolean;
  category?: string;
  searchQuery?: string;
}) => {
  try {
    let q = collection(db, "wishes");
    let constraints: any[] = [];
    
    if (filters?.onlyFulfilled) {
      constraints.push(where("isFulfilled", "==", true));
    } else if (filters?.onlyOpen) {
      constraints.push(where("isFulfilled", "==", false));
    }
    
    if (filters?.category && filters.category !== "all") {
      constraints.push(where("category", "==", filters.category));
    }
    
    // Add sorting by createdAt
    constraints.push(orderBy("createdAt", "desc"));
    
    const querySnapshot = await getDocs(query(q, ...constraints));
    
    let wishes: WishData[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<WishData, "id">;
      
      // If there's a search query, filter manually (Firestore doesn't support text search directly)
      if (filters?.searchQuery && !data.title.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
        return;
      }
      
      wishes.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt as Timestamp
      });
    });
    
    return wishes;
  } catch (error: any) {
    throw new Error(`Failed to fetch wishes: ${error.message}`);
  }
};

export const updateWishStatus = async (wishId: string, isFulfilled: boolean) => {
  try {
    const wishRef = doc(db, "wishes", wishId);
    await updateDoc(wishRef, {
      isFulfilled
    });
    return true;
  } catch (error: any) {
    throw new Error(`Failed to update wish status: ${error.message}`);
  }
};

export const likeWish = async (wishId: string) => {
  const user = getCurrentUser();
  if (!user) throw new Error("User not authenticated");

  try {
    // First check if the user has already liked this wish
    const likeRef = doc(db, "likes", `${user.uid}_${wishId}`);
    const likeDoc = await getDoc(likeRef);
    
    if (likeDoc.exists()) {
      // User already liked this wish, remove the like
      const wishRef = doc(db, "wishes", wishId);
      await updateDoc(wishRef, {
        likesCount: increment(-1)
      });
      
      // Delete the like document
      await updateDoc(likeRef, { active: false });
      return false; // Wish is now unliked
    } else {
      // User has not liked this wish, add a like
      const wishRef = doc(db, "wishes", wishId);
      await updateDoc(wishRef, {
        likesCount: increment(1)
      });
      
      // Create a like document to track this user's like
      await addDoc(collection(db, "likes"), {
        userId: user.uid,
        wishId,
        active: true,
        createdAt: Timestamp.now()
      });
      return true; // Wish is now liked
    }
  } catch (error: any) {
    throw new Error(`Failed to like wish: ${error.message}`);
  }
};
