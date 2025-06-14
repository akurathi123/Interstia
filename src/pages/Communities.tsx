import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import CreateCommunityModal from "@/components/community/CreateCommunityModal";
import { Users, MessageCircle, Plus, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { getCommunities, createCommunity } from "@/integrations/firebase/firebaseCommunityHelpers";

const Communities = () => {
  const [communities, setCommunities] = useState<any[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loadingCommunities, setLoadingCommunities] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, profile, signOut, updateProfile, loading, logActivity } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
      return;
    }
    if (user) {
      logActivity('page_visit', { page: 'communities' });
    }
    // Firebase: Load communities
    setLoadingCommunities(true);
    getCommunities().then(({ data, error }) => {
      if (error) {
        toast({
          title: "Unable to fetch communities",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setCommunities(data || []);
      }
      setLoadingCommunities(false);
    });
  }, [navigate, user, loading, logActivity, toast]);

  const handleLogout = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error logging out",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Logged out successfully",
        description: "See you next time!",
      });
      navigate("/");
    }
  };

  // Membership is tracked in the profile table (communities: string[]).
  const handleJoinCommunity = async (communityId: string) => {
    if (!profile) return;
    const currentCommunities = profile.communities || [];
    if (!currentCommunities.includes(communityId)) {
      const updatedCommunities = [...currentCommunities, communityId];
      const { error } = await updateProfile({ communities: updatedCommunities });
      if (error) {
        toast({
          title: "Error joining community",
          description: error.message,
          variant: "destructive",
        });
      } else {
        await logActivity('community_join', { community_id: communityId });
        toast({
          title: "Joined community!",
          description: "You can now participate in discussions",
        });
      }
    }
  };

  const handleEnterCommunity = async (community: any) => {
    await logActivity('community_visit', { community_id: community.id, community_name: community.name });
    navigate(`/community/${community.id}`, { state: { community } });
  };

  const isUserInCommunity = (communityId: string) => profile?.communities?.includes(communityId) || false;

  if (loading || loadingCommunities) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white flex items-center justify-center">
        <div>Please log in to access communities</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">∞</span>
            </div>
            <h1 className="text-2xl font-bold">Interstia Communities</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">Welcome, {profile?.username || user?.email}!</span>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleLogout}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-6 py-8">
        {/* Create Community Button */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Discover Communities</h2>
            <p className="text-gray-400">Join communities that match your interests</p>
          </div>
          <Button 
            onClick={() => setShowCreateModal(true)}
            className="bg-orange-500 hover:bg-orange-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Community
          </Button>
        </div>
        {/* Communities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {communities.map((community) => (
            <Card key={community.id} className="bg-gray-800/50 border-gray-700 hover:border-orange-500 transition-all duration-300 transform hover:scale-105">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-white text-lg">{community.name}</CardTitle>
                    <CardDescription className="text-gray-400 mt-2">
                      {community.description}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="bg-orange-500/20 text-orange-400">
                    Community
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {/* No. of members is not stored in community row itself */}
                    {isUserInCommunity(community.id) ? "1+" : "?"} members
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    {/* Messages count: can't get w/o another query, so hide or ? */}
                    ?
                  </div>
                </div>
                <div className="flex space-x-2">
                  {isUserInCommunity(community.id) ? (
                    <Button 
                      onClick={() => handleEnterCommunity(community)}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      Enter
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => handleJoinCommunity(community.id)}
                      variant="outline"
                      className="flex-1 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                    >
                      Join
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <CreateCommunityModal 
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCommunityCreated={async (newCommunity) => {
          setCommunities(prev => [...prev, newCommunity]);
          await handleJoinCommunity(newCommunity.id);
          await logActivity('community_create', {
            community_id: newCommunity.id,
            community_name: newCommunity.name
          });
        }}
        currentUser={profile}
      />
    </div>
  );
};

export default Communities;
