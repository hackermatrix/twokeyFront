import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useDarkMode } from "../context/darkModeContext";
import { supabase } from "../helper/supabaseClient";
import FileView from "./FileView";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
export default function SearchBar() {
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [isFileViewOpen, setIsFileViewOpen] = useState(false);
  const [selectedFileInfo, setSelectedFileInfo] = useState({
    name: "",
    size: "",
    id: "",
    owner: "",
    profileUrl: "",
    lastUpdate: "",
  });
  const [sharedFileInfo, setSharedFileInfo] = useState({});

  const getSharedFileInfo = async (fileId) => {
    try {
      let token = JSON.parse(secureLocalStorage.getItem("token"));
      const info = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/file/sharedFileInfo/${fileId}`,
        {
          headers: {
            Authorization: `Bearer ${token.session.access_token}`,
          },
        }
      );
      setSharedFileInfo(info.data);
    } catch (error) {
      console.log(error);
    }
  };

  const openDrawer = (
    fileName,
    fileSize,
    fileId,
    owner,
    profilePic,
    lastUpdate
  ) => {
    getSharedFileInfo(fileId);
    setSelectedFileInfo({
      name: fileName,
      size: fileSize,
      id: fileId,
      owner: owner,
      ownerProfileUrl: profilePic,
      lastUpdate: lastUpdate,
    });
    setIsFileViewOpen(true);
    // Close the search bar when a file is selected
    setSearchTerm("");
  };

  const closeDrawer = () => {
    setIsFileViewOpen(false);
  };

  useEffect(() => {
    const filesData = JSON.parse(
      secureLocalStorage.getItem("accountFilesCache")
    );

    if (filesData) {
      // Filter files based on the search term
      const filteredFiles = filesData.filter((file) =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFiles(filteredFiles);
    }
  }, [searchTerm]);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     // Fetch data from Supabase with text search
  //     const { data, error } = await supabase
  //       .from("user_info")
  //       .select("name,last_name,id")
  //       .ilike("name", `%${searchTerm}%`);

  //     if (error) {
  //       console.error(error);
  //     } else {
  //       setSearchResults(data);
  //       // console.log(data);
  //     }
  //   };

  //   fetchUserData();
  // }, [searchTerm]);

  useEffect(() => {
    // Only fetch user data if search term is not empty
    if (searchTerm.trim() !== "") {
      const fetchUserData = async () => {
        // Fetch data from Supabase with text search
        const { data, error } = await supabase
          .from("user_info")
          .select("name,last_name,id")
          .ilike("name", `%${searchTerm}%`);

        if (error) {
          console.error(error);
        } else {
          setSearchResults(data);
        }
      };

      fetchUserData();
    } else {
      // If search term is empty, reset search results
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleUserClick = (id) => {
    // Navigate to the "user-profile" route with the user ID or any relevant parameter
    navigate(`/user-profile/${id}`);
    // Close the search bar when a user is selected
    setSearchTerm("");
  };

  return (
    <div className="relative">
      <div className="w-10 md:w-96">
        <SearchIcon
          sx={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            left: "10px",
            color: "#808080",
          }}
        />
        <input
          type="search"
          placeholder="Search"
          className={`w-full p-1 pl-12 ${
            darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-700"
          } rounded-md`}
          style={{ outline: "none" }}
          value={searchTerm}
          onChange={handleSearchChange}
        ></input>
      </div>

      {/* Display search results */}
      {searchTerm && (
        <div className="absolute mt-2 rounded-sm overflow-y-scroll scrollbar-hide shadow-xl bg-white w-10 md:w-96 max-h-80">
          {filteredFiles && (
            <div className="my-2">
              <h3 className="text-md font-semibold p-4 border-b-[1px] border-gray-100">
                Files:
              </h3>
              <ul>
                {filteredFiles.map((file, index) => (
                  <li
                    key={index}
                    onClick={() =>
                      openDrawer(
                        file.name,
                        file.size,
                        file.id,
                        file.owner,
                        file.profilePic,
                        file.lastUpdate
                      )
                    }
                    className="p-4 border-b-[1px] border-gray-100 hover:bg-gray-50 cursor-pointer"
                  >
                    {file.name.split("_TS=")[0]}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* <hr className="" /> */}

          {searchResults && (
            <div className="my-2">
              <h3 className="text-md font-semibold p-4 border-b-[1px] border-gray-100">
                Users:
              </h3>
              <ul>
                {searchResults.map((result, index) => (
                  <li
                    key={index}
                    onClick={() => handleUserClick(result.id)}
                    className="p-4 border-b-[1px] border-gray-100 hover:bg-gray-50 cursor-pointer"
                  >
                    {result.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {isFileViewOpen && (
        <FileView
          fileInfo={selectedFileInfo}
          closeDrawer={closeDrawer}
          sharedFileInfo={sharedFileInfo}
        />
      )}
    </div>
  );
}
