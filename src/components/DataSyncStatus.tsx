import React from 'react';
import { FolderSync as Sync, CheckCircle, AlertCircle, Clock, ExternalLink, Database } from 'lucide-react';
import { useSuperConnectorSync } from '../hooks/useSuperConnectorSync';

export const DataSyncStatus: React.FC = () => {
  const { isConnected, syncStatus, lastSync, syncDiscoveries } = useSuperConnectorSync();

  const getStatusColor = () => {
    if (!isConnected) return 'text-slate-400';
    switch (syncStatus) {
      case 'syncing': return 'text-blue-600';
      case 'success': return 'text-green-600';
      case 'error': return 'text-red-600';
      default: return 'text-slate-400';
    }
  };

  const getStatusIcon = () => {
    if (!isConnected) return <AlertCircle size={16} />;
    switch (syncStatus) {
      case 'syncing': return <Clock size={16} className="animate-spin" />;
      case 'success': return <CheckCircle size={16} />;
      case 'error': return <AlertCircle size={16} />;
      default: return <Sync size={16} />;
    }
  };

  const getStatusText = () => {
    if (!isConnected) return 'Disconnected';
    switch (syncStatus) {
      case 'syncing': return 'Syncing...';
      case 'success': return 'Synced';
      case 'error': return 'Sync Error';
      default: return 'Ready';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-slate-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`${getStatusColor()}`}>
            <Database size={16} />
          </div>
          <div>
            <h3 className="font-medium text-slate-900">Research Data Integration</h3>
            <p className="text-sm text-slate-600">
              Syncing with research databases and challenge platforms {lastSync && `• Last sync: ${lastSync.toLocaleTimeString()}`}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={syncDiscoveries}
            disabled={syncStatus === 'syncing'}
            className="flex items-center space-x-2 px-3 py-2 border border-slate-300 rounded-md hover:bg-slate-50 transition-colors duration-200 disabled:opacity-50"
          >
            <Sync size={14} />
            <span>Sync Data</span>
          </button>
          <a
            href="https://convergentresearch.org"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            <ExternalLink size={14} />
            <span>Sources</span>
          </a>
        </div>
      </div>
      
      {isConnected && (
        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-semibold text-slate-900">156</div>
              <div className="text-xs text-slate-600">Challenges Tracked</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-slate-900">23</div>
              <div className="text-xs text-slate-600">Sources Monitored</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-slate-900">67</div>
              <div className="text-xs text-slate-600">Edge Opportunities</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};