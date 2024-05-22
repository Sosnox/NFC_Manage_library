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
  const [playerRecommendStart, setPlayerRecommendStart] = useState<string>('');
  const [playerRecommendEnd, setPlayerRecommendEnd] = useState<string>('');
  const [recommend, setRecommend] = useState<boolean>(false);
  const [ageRecommend, setAgeRecommend] = useState<string>('');
  const [timePlaying, setTimePlaying] = useState<string>('');
  const [typeGame, setTypeGame] = useState<string>('');
  const [countScanBoardgame, setCountScanBoardgame] = useState<number>(0);

  const [notification, setNotification] = useState<JSX.Element | null>(null);
  const [selectInput, setSelectInput] = useState(true)

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
    formData.append("player_recommend_start", playerRecommendStart);
    formData.append("player_recommend_end", playerRecommendEnd);
    formData.append("recommend", String(recommend));
    formData.append("age_recommend", ageRecommend);
    formData.append("time_playing", timePlaying);
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
    setPreviewUrl('');
    setTitleGame('');
    setDetailGame('');
    setPathYoutube('');
    setPlayerRecommendStart('');
    setPlayerRecommendEnd('');
    setRecommend(false);
    setAgeRecommend('');
    setTimePlaying('');
    setTypeGame('');
    setCountScanBoardgame(0);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'อื่นๆ') {
      setSelectInput(false);
    } else {
      setTypeGame(value);
    }
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
              onChange={(e) => setPlayerRecommendStart(e.target.value)}
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
              onChange={(e) => setPlayerRecommendEnd(e.target.value)}
            />
          </div>
        </div>

        <label className="text-white">เวลา : </label>
        <select
          name="time_playing"
          value={timePlaying}
          className="px-4 py-2 border border-gray-300 rounded-lg w-3/4"
        >

          <option value="15 นาที - 30 นาที">15 นาที - 30 นาที</option>
          <option value="30 นาที - 1 ชั่วโมง">30 นาที - 1 ชั่วโมง</option>
          <option value="1 ชั่วโมง - 2 ชั่วโมง">1 ชั่วโมง - 2 ชั่วโมง</option>
          <option value="2 ชั่วโมงขึ้นไป">2 ชั่วโมงขึ้นไป</option>  
        </select>

        <label className="text-white">อายุ :</label>
        <select
          name="time_playing"
          value={ageRecommend}
          className="px-4 py-2 border border-gray-300 rounded-lg w-3/4"
        >

          <option value="3">อายุ 3 ปีขึ้นไป</option>
          <option value="7">อายุ 7 ปีขึ้นไป</option>
          <option value="13">อายุ 13 ปีขึ้นไป</option>
          <option value="18">อายุ 18 ปีขึ้นไป</option>  
        </select>

        <label className="text-white">ประเภทเกม :</label>
        {selectInput ? (
        <select
          name="role"
          value={typeGame}
          className="px-4 py-2 border border-gray-300 rounded-lg w-3/4"
          onChange={handleSelectChange}
        >

          <option value="ครอบครัว(Family)">ครอบครัว(Family)</option>
          <option value="ปาร์ตี้(Party)">ปาร์ตี้(Party)</option>
          <option value="วางแผน(Plan)">วางแผน(Plan)</option>
          <option value="เด็ก(Child)">เด็ก(Child)</option>
          <option value="บลัฟ(ฺBluffing)">บลัฟ(ฺBluffing)</option>
          <option value="อื่นๆ">อื่นๆ</option>
        </select>
      ) : (
        <input  className="px-4 py-2 border border-gray-300 rounded-lg w-3/4" />
      )}

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
          className="p-2 pl-4 w-[150px] rounded-lg"
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
