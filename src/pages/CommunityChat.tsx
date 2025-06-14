import { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Send, Users, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp, doc, getDoc } from "firebase/firestore";
import { db } from "@/integrations/firebase/client";

const CommunityChat = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, profile, loading, logActivity } = useAuth();
  
  const [community, setCommunity] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [loadingCommunity, setLoadingCommunity] = useState(true);

  useEffect(() => {
    // Redirect if not authenticated
    if (!loading && !user) {
      navigate("/");
      return;
    }

    if (!profile) return;
    
    // Get community info
    const communityData = location.state?.community;
    if (communityData) {
      setCommunity(communityData);
      setLoadingCommunity(false);
    } else {
      // Fallback: fetch community from Firestore
      const fetchCommunity = async () => {
        try {
          const docRef = doc(db, "communities", id || "");
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setCommunity(docSnap.data());
          } else {
            toast({
              title: "Community not found",
              description: "The requested community does not exist.",
              variant: "destructive",
            });
            navigate("/communities");
          }
        } catch (error: any) {
          toast({
            title: "Error fetching community",
            description: error.message,
            variant: "destructive",
          });
          navigate("/communities");
        } finally {
          setLoadingCommunity(false);
        }
      };
      fetchCommunity();
    }
    
    // Check if user is member of this community
    if (!profile.communities?.includes(id || '')) {
      toast({
        title: "Access denied",
        description: "You must join this community first",
        variant: "destructive",
      });
      navigate("/communities");
      return;
    }
    
    // Log chat page visit
    if (user && communityData) {
      logActivity('chat_visit', {
        community_id: id,
        community_name: communityData.name
      });
    }
    
    // Subscribe to Firestore messages for this community
    const messagesQuery = query(
      collection(db, "community_chats"),
      where("communityId", "==", id),
      orderBy("timestamp", "asc")
    );
    const unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
      const msgs: any[] = [];
      querySnapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() });
      });
      setMessages(msgs);
    }, (error) => {
      console.error("Error fetching messages:", error);
      toast({
        title: "Error loading messages",
        description: error.message,
        variant: "destructive",
      });
    });

    return () => unsubscribe();
  }, [id, location.state, navigate, toast, user, profile, loading, logActivity]);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !profile) return;
    
    const message = {
      text: newMessage.trim(),
      sender: profile.username || user?.email || 'Anonymous',
      senderId: user?.uid,
      communityId: id,
      timestamp: serverTimestamp()
    };
    
    try {
      await addDoc(collection(db, "community_chats"), message);
      // Update community message count in Firestore
      // This requires additional Firestore update logic (not shown here)
      
      // Log message sent activity
      await logActivity('message_send', {
        community_id: id,
        community_name: community?.name,
        message_length: newMessage.trim().length
      });
      
      setNewMessage("");
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast({
        title: "Error sending message",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const formatTime = (timestamp: any) => {
    if (!timestamp) return "";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString();
  };

  if (loading || loadingCommunity) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (!user || !profile || !community) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/communities")}
              className="text-gray-300 hover:bg-gray-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-xl font-bold">{community.name}</h1>
              <p className="text-sm text-gray-400">{community.description}</p>
            </div>
          </div>
          
          <div className="flex items-center text-sm text-gray-400">
            <Users className="w-4 h-4 mr-1" />
            {community.members} members
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((message, index) => {
              const showDate = index === 0 || 
                formatDate(message.timestamp) !== formatDate(messages[index - 1].timestamp);
              
              return (
                <div key={message.id}>
                  {showDate && (
                    <div className="text-center text-xs text-gray-500 my-6">
                      {formatDate(message.timestamp)}
                    </div>
                  )}
                  
                  <Card className={`p-4 max-w-md ${
                    message.senderId === user?.uid
                      ? 'ml-auto bg-orange-500/20 border-orange-500/30' 
                      : 'bg-gray-800/50 border-gray-700'
                  }`}>
                    <div className="flex items-start justify-between mb-2">
                      <span className="font-semibold text-sm">
                        {message.senderId === user?.uid ? 'You' : message.sender}
                      </span>
                      <span className="text-xs text-gray-400">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                    <p className="text-white">{message.text}</p>
                  </Card>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="border-t border-gray-700 bg-gray-900/50 backdrop-blur-sm p-6">
        <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto">
          <div className="flex space-x-4">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-gray-800 border-gray-600 text-white"
            />
            <Button 
              type="submit"
              className="bg-orange-500 hover:bg-orange-600"
              disabled={!newMessage.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommunityChat;
