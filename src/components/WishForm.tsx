
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useState } from "react";
import { createWish } from "@/firebase/firestore";
import { useAuth } from "@/context/AuthContext";

const categories = [
  "Education",
  "Health",
  "Family",
  "Career",
  "Travel",
  "Personal",
  "Home",
  "Other"
];

const WishForm = () => {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      toast.error("Please sign in to create a wish");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await createWish({
        title: formData.title,
        description: formData.description,
        category: formData.category
      });
      
      toast.success("Your wish has been posted!");
      setFormData({
        title: "",
        description: "",
        category: ""
      });
    } catch (error: any) {
      toast.error(`Failed to create wish: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card className="card-shadow">
      <CardHeader>
        <CardTitle>Make a Wish</CardTitle>
        <CardDescription>
          Share your wish with the community and let someone make it come true.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {!currentUser && (
            <div className="bg-amber-50 p-3 rounded-md border border-amber-200 text-amber-800 text-sm">
              Please sign in to create a wish. Your wish will be associated with your account.
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="title">Wish Title</Label>
            <Input 
              id="title"
              name="title"
              placeholder="Give your wish a descriptive title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description"
              name="description"
              placeholder="Tell us more about your wish and why it matters to you..."
              rows={4}
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={handleCategoryChange}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button 
            type="submit" 
            className="button-gradient text-white"
            disabled={isSubmitting || !currentUser}
          >
            {isSubmitting ? "Posting..." : "Post Your Wish"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default WishForm;
