import { useState } from "react";
import NotiFail from "./components/PopupCheck/notifications/NotiFail";
import NotiPass from "./components/PopupCheck/notifications/NotiPass";

const endpoint = process.env.NEXT_PUBLIC_API_URL_AUTH;

const ManageBoardgame = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [titleGame, setTitleGame] = useState<string>('');
  const [detailGame, setDetailGame] = useState<string>('');
  const [pathYoutube, setPathYoutube] = useState<string>('');
  const [playerRecommendStart, setPlayerRecommendStart] = useState<number>(0);
  const [playerRecommendEnd, setPlayerRecommendEnd] = useState<number>(0);
  const [recommend, setRecommend] = useState<boolean>(false);
  const [ageRecommend, setAgeRecommend] = useState<number>(0);
  const [timePlaying, setTimePlaying] = useState<number>(0);
  const [typeGame, setTypeGame] = useState<string>('');
  const [countScanBoardgame, setCountScanBoardgame] = useState<number>(0);

  const [notification, setNotification] = useState<JSX.Element | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setSelectedFile(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl("");
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title_game", titleGame);
    formData.append("detail_game", detailGame);
    formData.append("path_youtube", pathYoutube);
    formData.append("player_recommend_start", String(playerRecommendStart));
    formData.append("player_recommend_end", String(playerRecommendEnd));
    formData.append("recommend", String(recommend));
    formData.append("age_recommend", String(ageRecommend));
    formData.append("time_playing", String(timePlaying));
    formData.append("type_game", typeGame);
    formData.append("count_scan_boardgame", String(countScanBoardgame));

    if (selectedFile !== null) {
      formData.append("file", selectedFile);
    }

    try {
      const response = await fetch(endpoint + "/admin/post_boardgame/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Data submitted successfully!");
        setNotification(<NotiPass />);
        resetForm();
      } else {
        console.error("Submission failed!", response);
        setNotification(<NotiFail />);
      }
    } catch (error) {
      console.error("Error during submission:", error);
      setNotification(<NotiFail />);
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    setTitleGame('');
    setDetailGame('');
    setPathYoutube('');
    setPlayerRecommendStart(0);
    setPlayerRecommendEnd(0);
    setRecommend(false);
    setAgeRecommend(0);
    setTimePlaying(0);
    setTypeGame('');
    setCountScanBoardgame(0);
  };

  return (
    <div className="flex items-center justify-center bg-gray-900 p-4 rounded-xl overflow-y-scroll h-[600px]">
      <div className="mr-24">
        <input className="text-white" type="file" onChange={handleFileChange} />
        <div className="mt-6">
          <img src={previewUrl} width={200} alt="Preview" />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-white mt-[250px]">ชื่อเกม :</label>
        <input
          type="text"
          placeholder="Title of the Game"
          value={titleGame}
          onChange={(e) => setTitleGame(e.target.value)}
          className="form-info"
        />

        <div className="flex flex-wrap gap-5">
          <div className="flex flex-col">
            <label className="text-white">จำนวนผู้เล่นตั้งแต่</label>
            <input
              type="number"
              name="player_recommend_start"
              placeholder="Player"
              className="form-info-int"
              value={playerRecommendStart}
              onChange={(e) => setPlayerRecommendStart(parseInt(e.target.value))}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-white">ถึง</label>
            <input
              type="number"
              name="player_recommend_end"
              placeholder="Player"
              className="form-info-int"
              value={playerRecommendEnd}
              onChange={(e) => setPlayerRecommendEnd(parseInt(e.target.value))}
            />
          </div>
        </div>

        <label className="text-white">อายุ :</label>
        <input
          type="number"
          placeholder="Age Recommend"
          value={ageRecommend}
          onChange={(e) => setAgeRecommend(parseInt(e.target.value))}
          className="form-info-int"
        />

        <label className="text-white">เวลาที่ใช้เล่นเกม :</label>
        <input
          type="number"
          placeholder="Time Playing"
          value={timePlaying}
          onChange={(e) => setTimePlaying(parseInt(e.target.value))}
          className="form-info-int"
        />

        <label className="text-white">ประเภทเกม :</label>
        <input
          type="text"
          placeholder="Type of Game"
          value={typeGame}
          onChange={(e) => setTypeGame(e.target.value)}
          className="form-info"
        />

        <label className="text-white">ลิงค์ :</label>
        <input
          type="text"
          placeholder="URL to a YouTube video"
          value={pathYoutube}
          onChange={(e) => setPathYoutube(e.target.value)}
          className="form-info"
        />

        <label className="text-white">เนื้อหา :</label>
        <textarea
          placeholder="Details about the Game"
          value={detailGame}
          onChange={(e) => setDetailGame(e.target.value)}
          className="h-[200px] rounded-lg p-[10px]"
        />

        <label className="text-white">แนะนำ:</label>
        <select
          value={recommend ? "true" : "false"}
          onChange={(e) => setRecommend(e.target.value === "true")}
          className="p-2 pr-4 pl-4 w-[150px] rounded-lg"
        >
          <option value="ture">เป็น</option>
          <option value="false">ไม่เป็น</option>
        </select>

        <button
          type="button"
          className="p-4 rounded-lg bg-green-500 hover:bg-green-400 text-xl font-bold text-white mt-4"
          onClick={handleSubmit}
        >
          Submit
        </button>
        {notification}
      </div>
    </div>
  );
};

export default ManageBoardgame;
