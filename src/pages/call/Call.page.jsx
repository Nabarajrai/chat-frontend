import { useEffect, useRef, useState } from "react";
import LayoutComponent from "../../components/layout/Layout.component";
import { openCamera, cameras } from "../../helpers/MediaDevice";
import ButtonComponent from "../../components/button/Button.component";

//icons
import { MdAddCall, MdCancel } from "react-icons/md";
import { BsFillMicMuteFill } from "react-icons/bs";
import { AiOutlineAudio } from "react-icons/ai";
import { IoVideocamOutline, IoVideocamOffOutline } from "react-icons/io5";

const CallPage = () => {
  const videoRef = useRef(null); // ✅ fixed typo
  const [loading, setLoading] = useState(true);
  const [openMic, setOpenMic] = useState(true);
  const [openVideo, setOpenVideo] = useState(true);

  useEffect(() => {
    let activeStream = null;

    const setupCamera = async () => {
      try {
        const cameraList = await cameras();
        if (cameraList && cameraList.length > 0) {
          const stream = await openCamera(cameraList[0].deviceId, 1280, 720);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
          activeStream = stream;
        }
      } catch (error) {
        console.error("Failed to set up camera:", error);
      } finally {
        setLoading(false);
      }
    };

    setupCamera();

    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="call-container">
      <LayoutComponent>
        <div className="video-section">
          {loading ? (
            <p>Loading video...</p>
          ) : (
            <div className="call-container">
              <div className="call-vedio">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  style={{ width: "100%", height: "auto" }}
                />
                <div className="call-control-action">
                  <div
                    className="call-action-mute-icon"
                    onClick={() => setOpenMic(!openMic)}>
                    {openMic ? <AiOutlineAudio /> : <BsFillMicMuteFill />}
                  </div>
                  <div
                    className="call-action-vedioOff-icon"
                    onClick={() => setOpenVideo(!openVideo)}>
                    {openVideo ? (
                      <IoVideocamOutline />
                    ) : (
                      <IoVideocamOffOutline />
                    )}
                  </div>
                </div>
              </div>
              <div className="call-action">
                <div className="call-action-join">
                  <ButtonComponent size="lg" varient="primary">
                    <span className="call-action__title">Call Now</span>
                    <span className="call-action__icon">
                      <MdAddCall />
                    </span>
                  </ButtonComponent>
                </div>
                <div className="call-action-cancel">
                  <ButtonComponent size="lg" varient="danger">
                    <span className="call-action__title">Cancel Call</span>
                    <span className="call-action__icon">
                      <MdCancel />
                    </span>
                  </ButtonComponent>
                </div>
              </div>
            </div>
          )}
        </div>
      </LayoutComponent>
    </div>
  );
};

export default CallPage;
