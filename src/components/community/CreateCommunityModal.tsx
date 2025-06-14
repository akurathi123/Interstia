import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { createCommunity } from "@/integrations/firebase/firebaseCommunityHelpers"; // Already correct in your last update

interface CreateCommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCommunityCreated: (community: any) => void;
  currentUser: any;
}

const CreateCommunityModal = ({ isOpen, onClose, onCommunityCreated, currentUser }: CreateCommunityModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.name.trim().length < 3) {
      toast({
        title: "Invalid name",
        description: "Community name must be at least 3 characters long",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (!currentUser?.id) {
      toast({
        title: "Invalid user",
        description: "Please log in again.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Firebase: Try to create the new community
    const { data: newCommunity, error } = await createCommunity({
      name: formData.name.trim(),
      description: formData.description.trim(),
      creatorId: currentUser.id
    });

    if (error) {
      toast({
        title: "Failed to create community",
        description: error.message,
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    toast({
      title: "Community created!",
      description: "Your community has been created successfully",
    });

    onCommunityCreated(newCommunity);
    onClose();
    setFormData({ name: "", description: "" });
    setIsLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Create Community</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Community Name *</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="bg-gray-800 border-gray-600 text-white"
              placeholder="Enter a unique community name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="bg-gray-800 border-gray-600 text-white"
              placeholder="Describe what your community is about"
              rows={3}
            />
          </div>
          <div className="flex space-x-3">
            <Button 
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-orange-500 hover:bg-orange-600"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCommunityModal;
