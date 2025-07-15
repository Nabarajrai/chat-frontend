import { useState, useEffect, useCallback } from "react";
//helpers
import { api, APIS } from "../config/Api.config";

export const useChannels = () => {
  const [channels, setChannels] = useState([]);
  const [isLoadingChannel, setIsLoadingChannel] = useState(false);
  const getChannels = useCallback(async () => {
    setIsLoadingChannel(true);
    try {
      const res = await api(APIS.channels, "GET");
      // console.log("Channels response:", res?.data);
      if (res?.status === "success") {
        setChannels(res?.data);
        setIsLoadingChannel(false);
      } else {
        console.error(res?.message);
      }
    } catch (e) {
      console.error("Error fetching channels:", e);
    } finally {
      {
        setIsLoadingChannel(false);
      }
    }
  }, []);

  return {
    channels,
    isLoadingChannel,
    getChannels,
  };
};

export const useChannelById = () => {
  const [channelDetails, setChannelDetails] = useState([]);
  const getChannelDetails = useCallback(async (channelId) => {
    try {
      const res = await api(`${APIS.getByChannelId}/${channelId}`);
      if (res?.status === "success") {
        setChannelDetails(res?.data);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  return {
    getChannelDetails,
    channelDetails,
  };
};
