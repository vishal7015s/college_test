import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useLiveUsers = () => {
  const [liveUsersCount, setLiveUsersCount] = useState(0);
  const [totalUsersCount, setTotalUsersCount] = useState(0);

  // Generate a unique session ID for this browser session
  const getSessionId = () => {
    let sessionId = sessionStorage.getItem('session_id');
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      sessionStorage.setItem('session_id', sessionId);
    }
    return sessionId;
  };

  // Update user presence
  const updatePresence = async () => {
    const sessionId = getSessionId();
    const { data: { user } } = await supabase.auth.getUser();
    
    try {
      await supabase.rpc('update_user_presence', {
        session_uuid: sessionId,
        user_uuid: user?.id || null
      });
    } catch (error) {
      console.error('Error updating presence:', error);
    }
  };

  // Fetch live users count
  const fetchLiveUsers = async () => {
    try {
      const { data, error } = await supabase.rpc('get_live_users_count');
      if (!error && data !== null) {
        setLiveUsersCount(data);
      }
    } catch (error) {
      console.error('Error fetching live users:', error);
    }
  };

  // Fetch total users count
  const fetchTotalUsers = async () => {
    try {
      const { data, error } = await supabase.rpc('get_total_users_count');
      if (!error && data !== null) {
        setTotalUsersCount(data);
      }
    } catch (error) {
      console.error('Error fetching total users:', error);
    }
  };

  useEffect(() => {
    // Initial presence update
    updatePresence();
    
    // Initial data fetch
    fetchLiveUsers();
    fetchTotalUsers();

    // Set up intervals
    const presenceInterval = setInterval(updatePresence, 30000); // Update every 30 seconds
    const fetchInterval = setInterval(() => {
      fetchLiveUsers();
      fetchTotalUsers();
    }, 10000); // Fetch every 10 seconds

    // Cleanup on unmount
    return () => {
      clearInterval(presenceInterval);
      clearInterval(fetchInterval);
    };
  }, []);

  // Update presence when page becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        updatePresence();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return { liveUsersCount, totalUsersCount };
};