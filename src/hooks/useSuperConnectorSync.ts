import { useState, useEffect, useCallback } from 'react';
import { superConnectorService, SuperConnectorProfile, EdgeFinderInsight, RecombinationOpportunity } from '../services/superconnector';

export const useSuperConnectorSync = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
  const [lastSync, setLastSync] = useState<Date | null>(null);

  // Auto-sync discoveries periodically
  useEffect(() => {
    const syncInterval = setInterval(async () => {
      if (isConnected) {
        await syncDiscoveries();
      }
    }, 300000); // Sync every 5 minutes

    return () => clearInterval(syncInterval);
  }, [isConnected]);

  const connectToSuperConnector = useCallback(async () => {
    try {
      setSyncStatus('syncing');
      // Test connection with a simple API call
      await superConnectorService.searchProfiles('test', { domains: ['quantum'] });
      setIsConnected(true);
      setSyncStatus('success');
      setLastSync(new Date());
    } catch (error) {
      console.error('Failed to connect to SuperConnector:', error);
      setIsConnected(false);
      setSyncStatus('error');
    }
  }, []);

  const syncDiscoveries = useCallback(async () => {
    if (!isConnected) return;

    try {
      setSyncStatus('syncing');
      
      // Get current discoveries from local state/storage
      const discoveries = {
        gaps: JSON.parse(localStorage.getItem('edgefinder-gaps') || '[]'),
        problems: JSON.parse(localStorage.getItem('edgefinder-problems') || '[]'),
        methods: JSON.parse(localStorage.getItem('edgefinder-methods') || '[]'),
        insights: JSON.parse(localStorage.getItem('edgefinder-insights') || '[]')
      };

      await superConnectorService.syncDiscoveries(discoveries);
      setSyncStatus('success');
      setLastSync(new Date());
    } catch (error) {
      console.error('Sync failed:', error);
      setSyncStatus('error');
    }
  }, [isConnected]);

  const enrichSuperConnector = useCallback(async (insights: EdgeFinderInsight[]) => {
    if (!isConnected) return false;
    
    try {
      const success = await superConnectorService.enrichSuperConnector(insights);
      if (success) {
        setLastSync(new Date());
      }
      return success;
    } catch (error) {
      console.error('Failed to enrich SuperConnector:', error);
      return false;
    }
  }, [isConnected]);

  const shareRecombinationOpportunities = useCallback(async (opportunities: RecombinationOpportunity[]) => {
    if (!isConnected) return false;
    
    try {
      const success = await superConnectorService.shareRecombinationOpportunities(opportunities);
      if (success) {
        setLastSync(new Date());
      }
      return success;
    } catch (error) {
      console.error('Failed to share recombination opportunities:', error);
      return false;
    }
  }, [isConnected]);

  return {
    isConnected,
    syncStatus,
    lastSync,
    connectToSuperConnector,
    syncDiscoveries,
    enrichSuperConnector,
    shareRecombinationOpportunities
  };
};