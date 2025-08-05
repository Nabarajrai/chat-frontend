export const getConnectedDevices = async (type) => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter((device) => device.kind === type);
  } catch (error) {
    console.error("Error fetching media devices:", error);
    return [];
  }
};

export const openCamera = async (cameraId, width = 640, height = 480) => {
  const constraints = {
    audio: { echoCancellation: true },
    video: {
      deviceId: { exact: cameraId },
      width: { ideal: width },
      height: { ideal: height },
    },
  };

  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    return stream;
  } catch (error) {
    console.error("Error accessing camera:", error.name, error.message);
    if (error.name === "OverconstrainedError") {
      console.warn("Retrying without constraints...");
      try {
        return await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
      } catch (fallbackError) {
        console.error(
          "Fallback failed:",
          fallbackError.name,
          fallbackError.message
        );
      }
    }
    return null;
  }
};

export const cameras = async () => {
  return await getConnectedDevices("videoinput");
};
