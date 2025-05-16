import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { toast as sonnerToast } from "@/components/ui/sonner";
import toast from "react-hot-toast";
import { Bell } from "lucide-react";

export default function NotificationsDemo() {
  const { toast: uiToast } = useToast();
  const [activeTab, setActiveTab] = useState('ui');
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);

  const showUIToast = () => {
    uiToast({
      title: "UI Toast Notification",
      description: "This is a notification from UI toast component",
      variant: "default",
    });
  };

  const showSonnerToast = () => {
    sonnerToast("Sonner Notification", {
      description: "This is a notification from Sonner",
      action: {
        label: "Undo",
        onClick: () => sonnerToast("Action clicked"),
      },
    });
  };

  const showHotToast = () => {
    toast.success("Success notification from Hot Toast!");
  };

  const showAllToasts = () => {
    showUIToast();
    showSonnerToast();
    showHotToast();
  };

  const toggleNotificationPopup = () => {
    setShowNotificationPopup(!showNotificationPopup);
  };

  const clearNotifications = () => {
    setNotificationCount(0);
    setShowNotificationPopup(false);
    sonnerToast("Notifications cleared", {
      description: "You have cleared all notifications",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 relative">
        {/* Bell icon with badge */}
        <div className="absolute top-6 right-6">
          <button 
            onClick={toggleNotificationPopup}
            className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Bell size={24} />
            {notificationCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </button>
          
          {/* Notification popup */}
          {showNotificationPopup && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10 border border-gray-200">
              <div className="p-3 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-medium">Notifications</h3>
                <button 
                  onClick={clearNotifications}
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  Clear all
                </button>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notificationCount > 0 ? (
                  <>
                    <div className="p-3 border-b border-gray-100 hover:bg-gray-50">
                      <p className="text-sm font-medium">New feature available</p>
                      <p className="text-xs text-gray-500">Check out our new notification system</p>
                    </div>
                    <div className="p-3 border-b border-gray-100 hover:bg-gray-50">
                      <p className="text-sm font-medium">Your profile was updated</p>
                      <p className="text-xs text-gray-500">Your settings have been saved</p>
                    </div>
                    <div className="p-3 hover:bg-gray-50">
                      <p className="text-sm font-medium">Welcome to the demo!</p>
                      <p className="text-xs text-gray-500">Explore our notification options</p>
                    </div>
                  </>
                ) : (
                  <div className="p-3 text-center text-gray-500 text-sm">
                    No new notifications
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center">Notification Demo</h2>
        
        <div className="flex mb-4">
          <button 
            className={`flex-1 py-2 px-4 ${activeTab === 'ui' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('ui')}
          >
            UI Toast
          </button>
          <button 
            className={`flex-1 py-2 px-4 ${activeTab === 'sonner' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('sonner')}
          >
            Sonner
          </button>
          <button 
            className={`flex-1 py-2 px-4 ${activeTab === 'hot' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('hot')}
          >
            Hot Toast
          </button>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-md mb-6">
          {activeTab === 'ui' && (
            <div>
              <h3 className="font-medium mb-2">UI Toast</h3>
              <p className="text-sm mb-4">UI toast component with customizable variants and positions.</p>
              <Button onClick={showUIToast} className="w-full">Show UI Toast</Button>
            </div>
          )}
          
          {activeTab === 'sonner' && (
            <div>
              <h3 className="font-medium mb-2">Sonner Toast</h3>
              <p className="text-sm mb-4">Modern, customizable toast component with action buttons.</p>
              <Button onClick={showSonnerToast} className="w-full">Show Sonner Toast</Button>
            </div>
          )}
          
          {activeTab === 'hot' && (
            <div>
              <h3 className="font-medium mb-2">Hot Toast</h3>
              <p className="text-sm mb-4">Lightweight toast notifications with built-in success/error styles.</p>
              <Button onClick={showHotToast} className="w-full">Show Hot Toast</Button>
            </div>
          )}
        </div>
        
        <Button onClick={showAllToasts} className="w-full bg-green-600 hover:bg-green-700">
          Show All Notifications
        </Button>
      </div>
    </div>
  );
}