import React, { useState } from "react";
import Select from "react-dropdown-select";
import "./Progress.css";
import { ReactComponent as ChevronDown } from "../../Assets/Chevron_down.svg";
import { ReactComponent as ProgressCircle } from "../../Assets/Circle.svg";
import { ReactComponent as CalenderIcon } from "../../Assets/Calender_icon.svg";
import { ReactComponent as TimerIcon } from "../../Assets/timer_icon.svg";
import { ReactComponent as RewardIcon } from "../../Assets/Reward_icon.svg";
const Progress = ({ courseDetails }) => {
  const [modules, setModules] = useState();
  const [topics, setTopics] = useState();
  const [isOpenSecond, setIsOpenSecond] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  // const [isOpenCourse, setOpenCourse] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const toggleSelectCourse = (courseId) => {
    setSelectedCourseId((prevCourseId) =>
      prevCourseId === courseId ? null : courseId
    );
    console.log("courseId", courseId);
    // setOpenCourse((prevIsOpen) => !prevIsOpen);
  };
  // console.log("isOpenCourse",isOpenCourse);
  console.log("selectedCourseId", selectedCourseId);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const toggleDropdown2 = () => {
    setIsOpenSecond(!isOpenSecond);
  };
  return (
    <div className="grid gap-2">
      <div className="chat-header flex gap-3 px-2">
        {console.log("courseDetails", courseDetails)}
        <div className=" border-none w-auto flex gap-2">
          <div
            className={`dropdown-header  h-[24px] ${
              isOpen ? " bg-[#3838F1]" : " bg-[#F5F5FF]"
            }`}
            onClick={toggleDropdown}
          >
            <span className={` text-xs ${isOpen ? "text-[#F5F5FF]" : "text-gray-500"}`}>
              JAVA FULL STACK
            </span>
          </div>
          <div
            className={`dropdown-header2  h-[24px] ${
              isOpenSecond ? " bg-[#3838F1]" : " bg-[#F5F5FF]"
            }`}
            onClick={toggleDropdown2}
          >
            <span
              className={`text-xs ${
                isOpenSecond ? "text-[#F5F5FF]" : "text-[#060206]"
              }`}
            >
              <span
                className={`text-xs ${
                  isOpenSecond ? "text-[#AEAED4]" : "text-gray-500"
                }`}
              >
                12 Jun
              </span>{" "}
              Fundamentals - Compiler & Assembler
            </span>
          </div>
        </div>
      </div>
      <div className=" pr-2 pl-2">
        {isOpen && (
          <div className="flex flex-col bg-white z-50 absolute  rounded-md shadow-md h-[540px] w-[46vw]">
            <div className="p-5 grid gap-2 border-b-[1px] border-[#D7D7D7]">
              <div>
                <h3 className="text-lg font-semibold font-sans">
                  {courseDetails?.name}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className=" font-semibold text-[14px] text-[#42B25B]">
                  1% Complete
                </span>{" "}
                <CalenderIcon />
                <span className="text-[#6E6E6F] text-[14px] font-semibold">
                  12 Jun
                </span>
                <RewardIcon />
                <span className="text-[#6E6E6F] text-[14px] font-semibold">
                  1500 points
                </span>
              </div>
            </div>

            <div className=" p-5 scrollable-div flex-grow">
              {courseDetails &&
                courseDetails?.children.map((item) => (
                  <div
                    className={`dropdown ${
                      selectedCourseId === item.node_id
                        ? "open transition-max-height overflow-hidden duration-700 ease-in"
                        : ""
                    }`}
                  >
                    <div
                      className="dropdown-course"
                      onClick={() => toggleSelectCourse(item?.node_id)}
                    >
                      <div className="flex gap-2 items-center dropdown-course-inner-div">
                        <ProgressCircle />
                        <h3
                          className={`text-[#6E6E6F] text-base font-semibold ${
                            selectedCourseId === item.node_id ? "open" : ""
                          }`}
                        >
                          {item?.node_name}
                        </h3>
                      </div>
                      <ChevronDown
                        className={`icon ${
                          selectedCourseId === item.node_id ? "open" : ""
                        }`}
                      />
                    </div>
                    <div
                      className={`dropdown-body ${
                        selectedCourseId === item.node_id
                          ? "open transition-max-height overflow-hidden duration-700 ease-in-out"
                          : ""
                      }`}
                    >
                      {item?.children.map((items) => (
                        <div
                          className="dropdown-item flex justify-between"
                          id={items?.course_id}
                        >
                          <div className="flex gap-2 items-center">
                            <ProgressCircle />
                            <span className="text-base font-semibold">
                              18 Jun
                            </span>
                            <span className="text-base font-semibold">
                              {" "}
                              {items?.node_name}
                            </span>
                          </div>
                          <div className="flex gap-2 items-center text-xs">
                            <span>2hrs</span>
                            <span>10 pts</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center">
        {isOpenSecond && (
          <div className="flex flex-col bg-white z-50 absolute  rounded-md shadow-md  w-[435px]">
            <div className="p-5 grid gap-2 border-b-[1px] border-[#D7D7D7]">
              <div>
                <h3 className="font-semibold font-sans text-lg">
                Fundamentals - Compiler & Assembler
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className=" font-semibold text-[14px] text-[#42B25B]">
                  1% Complete
                </span>
                <CalenderIcon />
                <span className="text-[#6E6E6F] text-[14px] font-semibold">
                  12 Jun
                </span>
                <TimerIcon />
                <span className="text-[#6E6E6F] text-[14px] font-semibold">
                  2 hrs
                </span>
                <RewardIcon />
                <span className="text-[#6E6E6F] text-[14px] font-semibold">
                  1500 points
                </span>
              </div>
            </div>

            <div className=" p-5 scrollable-div flex-grow">
              {courseDetails && (
                <div className={`rounded-lg bg-[#F4F4F4] cursor-pointer`}>
                  <div className="dropdown-topic">
                    {courseDetails?.children[0]?.children.map(
                      (subItem, subIndex) => (
                        <div
                          key={subIndex}
                          className="flex gap-2 items-center dropdown-course-inner-div pt-2 pl-4 pb-2 pr-4 justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <ProgressCircle />
                            <h3
                              className={`text-[#6E6E6F] text-base font-semibold `}
                            >
                              {subItem?.node_name}
                            </h3>
                          </div>
                          <div className="flex gap-2">
                            <span className="text-[#6E6E6F] text-[12px] font-semibold">
                              2 hrs
                            </span>
                            <span className="text-[#6E6E6F] text-[12px] font-semibold">
                              2 pts
                            </span>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Progress;
