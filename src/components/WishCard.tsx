
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { likeWish, updateWishStatus } from "@/firebase/firestore";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { Timestamp } from "firebase/firestore";

export interface WishProps {
  id?: string; // Changed from required to optional to match WishData
  title: string;
  description: string;
  category: string;
  createdBy: {
    uid: string;
    name: string;
  };
  createdAt: Timestamp | Date;
  isFulfilled: boolean;
  likesCount: number;
}

const WishCard = ({ id = '', title, description, category, createdBy, createdAt, isFulfilled, likesCount }: WishProps) => {
  const { currentUser } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(likesCount);
  const [fulfilled, setFulfilled] = useState(isFulfilled);
  
  const formattedDate = createdAt instanceof Timestamp ?
    formatDistanceToNow(createdAt.toDate(), { addSuffix: true }) :
    formatDistanceToNow(createdAt, { addSuffix: true });
  
  const isOwner = currentUser?.uid === createdBy.uid;
  
  const toggleLike = async () => {
    if (!currentUser) {
      toast.error("Please sign in to like wishes");
      return;
    }
    
    if (!id) {
      toast.error("Cannot like wish: missing wish ID");
      return;
    }
    
    try {
      const newLikeState = !isLiked;
      await likeWish(id);
      setIsLiked(newLikeState);
      setLikes(prev => newLikeState ? prev + 1 : prev - 1);
    } catch (error: any) {
      toast.error(`Failed to like wish: ${error.message}`);
    }
  };
  
  const toggleFulfillment = async () => {
    if (!currentUser) {
      toast.error("Please sign in to fulfill wishes");
      return;
    }
    
    if (!id) {
      toast.error("Cannot update wish status: missing wish ID");
      return;
    }
    
    try {
      const newFulfillmentState = !fulfilled;
      await updateWishStatus(id, newFulfillmentState);
      setFulfilled(newFulfillmentState);
      
      if (newFulfillmentState) {
        toast.success("You've fulfilled this wish! Thank you for your generosity!");
      }
    } catch (error: any) {
      toast.error(`Failed to update wish status: ${error.message}`);
    }
  };
  
  return (
    <Card className="card-shadow overflow-hidden group h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1">
              <div className="h-6 w-6 rounded-full bg-wishes-purple flex items-center justify-center text-white text-xs">
                {createdBy.name.charAt(0)}
              </div>
              <span>{createdBy.name}</span>
              <span className="text-wishes-gray">•</span>
              <span className="text-wishes-gray">{formattedDate}</span>
            </CardDescription>
          </div>
          <Badge variant={fulfilled ? "default" : "outline"} className={fulfilled ? "bg-green-500" : "border-wishes-purple text-wishes-purple"}>
            {fulfilled ? "Fulfilled" : "Open"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="line-clamp-3 text-wishes-gray">{description}</p>
        <div className="mt-3">
          <Badge variant="secondary" className="bg-wishes-purple/10 text-wishes-purple hover:bg-wishes-purple/20">
            {category}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-3 flex justify-between">
        <Button 
          variant="ghost" 
          size="sm" 
          className="gap-1 text-wishes-gray"
          onClick={toggleLike}
        >
          <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
          <span>{likes}</span>
        </Button>
        {isOwner && fulfilled ? (
          <Button size="sm" variant="outline" onClick={toggleFulfillment}>
            Mark as Open
          </Button>
        ) : (
          <Button 
            size="sm" 
            className="button-gradient text-white"
            onClick={fulfilled ? undefined : toggleFulfillment}
          >
            {fulfilled ? "View Story" : "Grant Wish"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default WishCard;
