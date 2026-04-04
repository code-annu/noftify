import React, { useEffect, useState } from "react";
import { TextInputField } from "../../../components/inputs/TextInputField";
import { PrimaryButton } from "../../../components/buttons/PrimaryButton";
import useChannelsMutations from "../hooks/useChannelsMutations";
import { type Channel, ChannelType, type EmailConfig } from "../data/types";

interface EmailChannelTabProps {
  appId: string;
  channel?: Channel;
  onSuccess: () => void;
}

const EmailChannelTab: React.FC<EmailChannelTabProps> = ({
  appId,
  channel,
  onSuccess,
}) => {
  const { createChannel, creatingChannel, updateChannel, updatingChannel } =
    useChannelsMutations();

  const [name, setName] = useState("Email Channel");
  const [provider, setProvider] = useState("smtp");
  const [host, setHost] = useState("");
  const [port, setPort] = useState<number | "">("");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [from, setFrom] = useState("");

  useEffect(() => {
    if (channel && channel.type === ChannelType.EMAIL && channel.configJson) {
      setName(channel.name);
      setProvider(channel.provider);
      const config = channel.configJson as EmailConfig;
      setHost(config.host || "");
      setPort(config.port || "");
      setUser(config.auth?.user || "");
      setPass(config.auth?.pass || "");
      setFrom(config.from || "");
    }
  }, [channel]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const configJson: EmailConfig = {
      host,
      port: Number(port),
      auth: { user, pass },
      from,
    };

    if (channel) {
      const updated = await updateChannel(channel.id, {
        name,
        configJson,
      });
      if (updated) onSuccess();
    } else {
      const created = await createChannel(appId, {
        type: ChannelType.EMAIL,
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
          placeholder="e.g. SMTP Email"
          required
        />
        <TextInputField
          label="Provider"
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
          placeholder="e.g. smtp, sendgrid"
          required
        />
        <TextInputField
          label="SMTP Host"
          value={host}
          onChange={(e) => setHost(e.target.value)}
          placeholder="smtp.example.com"
          required
        />
        <TextInputField
          label="SMTP Port"
          type="number"
          value={port}
          onChange={(e) => setPort(e.target.value === "" ? "" : Number(e.target.value))}
          placeholder="587"
          required
        />
        <TextInputField
          label="SMTP Username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          placeholder="user@example.com"
          required
        />
        <TextInputField
          label="SMTP Password"
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="********"
          required
        />
        <div className="md:col-span-2">
          <TextInputField
            label="From Email Address"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="noreply@yourdomain.com"
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

export default EmailChannelTab;
