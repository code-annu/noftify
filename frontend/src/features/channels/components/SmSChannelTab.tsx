import React, { useEffect, useState } from "react";
import { TextInputField } from "../../../components/inputs/TextInputField";
import { PrimaryButton } from "../../../components/buttons/PrimaryButton";
import useChannelsMutations from "../hooks/useChannelsMutations";
import { type Channel, ChannelType, type SmSConfig } from "../data/types";

interface SmSChannelTabProps {
  appId: string;
  channel?: Channel;
  onSuccess: () => void;
}

const SmSChannelTab: React.FC<SmSChannelTabProps> = ({
  appId,
  channel,
  onSuccess,
}) => {
  const { createChannel, creatingChannel, updateChannel, updatingChannel } =
    useChannelsMutations();

  const [name, setName] = useState("SMS Channel");
  const [provider, setProvider] = useState("twilio");
  const [sid, setSid] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    if (channel && channel.type === ChannelType.SMS && channel.configJson) {
      setName(channel.name);
      setProvider(channel.provider);
      const config = channel.configJson as SmSConfig;
      setSid(config.sid || "");
      setToken(config.token || "");
    }
  }, [channel]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const configJson: SmSConfig = {
      sid,
      token,
    };

    if (channel) {
      const updated = await updateChannel(channel.id, {
        name,
        configJson,
      });
      if (updated) onSuccess();
    } else {
      const created = await createChannel(appId, {
        type: ChannelType.SMS,
        name,
        provider,
        configJson,
      });
      if (created) onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextInputField
          label="Channel Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Twilio SMS"
          required
        />
        <TextInputField
          label="Provider"
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
          placeholder="e.g. twilio"
          required
        />
        <div className="md:col-span-2">
          <TextInputField
            label="Account SID"
            value={sid}
            onChange={(e) => setSid(e.target.value)}
            placeholder="AC12345..."
            required
          />
        </div>
        <div className="md:col-span-2">
          <TextInputField
            label="Auth Token"
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="********"
            required
          />
        </div>
      </div>
      <div className="flex justify-end pt-4">
        <PrimaryButton type="submit" isLoading={creatingChannel || updatingChannel}>
          {channel ? "Update Channel" : "Create Channel"}
        </PrimaryButton>
      </div>
    </form>
  );
};

export default SmSChannelTab;
