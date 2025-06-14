import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToLogin: () => void;
}

const ForgotPasswordModal = ({ isOpen, onClose, onBackToLogin }: ForgotPasswordModalProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { toast } = useToast();
  const { resetPassword } = useAuth();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await resetPassword(email);

    if (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to send reset email",
        variant: "destructive",
      });
    } else {
      setEmailSent(true);
      toast({
        title: "Reset email sent!",
        description: "Check your email for password reset instructions",
      });
    }

    setIsLoading(false);
  };

  const handleClose = () => {
    setEmailSent(false);
    setEmail("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {emailSent ? "Check Your Email" : "Reset Password"}
          </DialogTitle>
        </DialogHeader>
        
        {emailSent ? (
          <div className="space-y-6 text-center">
            <p className="text-gray-300">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
            <p className="text-sm text-gray-400">
              Click the link in the email to reset your password. You can close this window.
            </p>
            <Button 
              onClick={onBackToLogin}
              variant="outline"
              className="w-full border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
            >
              Back to Login
            </Button>
          </div>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="reset-email">Email Address</Label>
              <Input
                id="reset-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white"
                placeholder="Enter your email address"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-orange-500 hover:bg-orange-600"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>
            
            <div className="text-center">
              <button 
                type="button"
                onClick={onBackToLogin}
                className="text-orange-500 hover:text-orange-400 underline text-sm"
              >
                Back to Login
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordModal;