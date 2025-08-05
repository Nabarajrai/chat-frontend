const getConnectedDevices = async (type) => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter((device) => device.kind === type);
  } catch (error) {
    console.error("Error fetching media devices:", error);
    return [];
  }
};

export const openCamera = async (cameraId, minWidth, minHeight) => {
  const constraints = {
    audio: { echoCancellation: true },
    video: {
      deviceId: cameraId,
      width: { min: minWidth },
      height: { min: minHeight },
    },
  };
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    return stream;
  } catch (error) {
    console.error("Error accessing camera:", error);
    return null;
  }
};

export const cameras = getConnectedDevices("videoinput");
