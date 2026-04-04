import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/app-hook";
import { getAppChannelsThunk } from "../state/channel-thunk";
import { CircularLoadingBar } from "../../../components/progress/CircularLoadingBar";
import { ChannelType } from "../data/types";
import EmailChannelTab from "../components/EmailChannelTab";
import SmSChannelTab from "../components/SmSChannelTab";
import PushChannelTab from "../components/PushChannelTab";

enum ActiveTab {
  EMAIL = "email",
  SMS = "sms",
  PUSH = "push",
}

const ChannelsPage: React.FC = () => {
  const { id: appId } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const {
    data: channelsList,
    isLoading,
    error,
  } = useAppSelector((state) => state.channels.channels);

  const [activeTab, setActiveTab] = useState<ActiveTab>(ActiveTab.EMAIL);

  useEffect(() => {
    if (appId) {
      dispatch(getAppChannelsThunk(appId));
    }
  }, [dispatch, appId]);

  const handleSuccess = () => {
    if (appId) {
      dispatch(getAppChannelsThunk(appId));
    }
  };

  if (isLoading && !channelsList) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <CircularLoadingBar />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-100 text-red-700 p-6 rounded-2xl">
          <h2 className="text-lg font-bold">Failed to load channels</h2>
          <p className="mt-1">
            {error.error.message || "Something went wrong"}
          </p>
        </div>
      </div>
    );
  }

  if (!appId) {
    return <div className="p-8">App ID must be provided in URL.</div>;
  }

  const channels = channelsList?.channels || [];
  const emailChannel = channels.find((c) => c.type === ChannelType.EMAIL);
  const smsChannel = channels.find((c) => c.type === ChannelType.SMS);
  const pushChannel = channels.find((c) => c.type === ChannelType.PUSH);

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-gray-100">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
          Channels
        </h1>
        <p className="text-gray-500 mb-8">
          Configure notification delivery channels for your application.
        </p>

        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab(ActiveTab.EMAIL)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${
                  activeTab === ActiveTab.EMAIL
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
            >
              Email Channel {emailChannel ? "✅" : ""}
            </button>
            <button
              onClick={() => setActiveTab(ActiveTab.SMS)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${
                  activeTab === ActiveTab.SMS
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
            >
              SMS Channel {smsChannel ? "✅" : ""}
            </button>
            <button
              onClick={() => setActiveTab(ActiveTab.PUSH)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${
                  activeTab === ActiveTab.PUSH
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
            >
              Push Channel {pushChannel ? "✅" : ""}
            </button>
          </nav>
        </div>

        <div className="pt-2">
          {activeTab === ActiveTab.EMAIL && (
            <EmailChannelTab
              appId={appId}
              channel={emailChannel}
              onSuccess={handleSuccess}
            />
          )}
          {activeTab === ActiveTab.SMS && (
            <SmSChannelTab
              appId={appId}
              channel={smsChannel}
              onSuccess={handleSuccess}
            />
          )}
          {activeTab === ActiveTab.PUSH && <PushChannelTab appId={appId} />}
        </div>
      </div>
    </div>
  );
};

export default ChannelsPage;
