import { useEffect, useMemo, useState } from "react";
import { data } from "./data";

export default function App() {
  const [job, setJob] = useState(data);
  const [input, setInput] = useState("");
  const [type, setType] = useState("");

  const typeDetails = (item) => {
    setType(item);
  };

  useEffect(() => {
    if (type === "") return setJob(data);
    setJob(() =>
      data?.filter((data) => {
        const result = data?.jobDetail?.type == type;
        return result;
      })
    );
  }, [type]);

  const handleSearch = (e) => {
    setInput(e.target.value);
  };

  const final = useMemo(() => {
    return job.filter((data) =>
      data.title.toLowerCase().includes(input.toLowerCase())
    );
  }, [input, job]);

  return (
    <div className="flex flex-col gap-5 mx-10 my-6 w-[400px] overflow-y-scroll no-scrollbar ">
      <div>
        <img
          src="https://d8it4huxumps7.cloudfront.net/uploads/images/unstop/svg/unstop-logo.svg"
          alt=""
          width="82px"
        />
      </div>
      <div className="flex flex-col gap-6">
        <div>
          <input
            type="text"
            className="border outline-none rounded-full h-6 p-4"
            value={input}
            placeholder="Search Jobs"
            onChange={handleSearch}
          />
        </div>
        <div className="flex gap-16">
          <div className="flex gap-5">
            <button
              className={` font-normal px-4 border border-blue-500 rounded-full ${
                type === "in_office"
                  ? "bg-blue-600 text-white font-bold"
                  : "bg-transparent text-blue-600"
              }`}
              onClick={() => typeDetails("in_office")}
            >
              In Office
            </button>
            <button
              className={`font-normal px-4 border border-blue-500 rounded-full ${
                type === "hybrid"
                  ? "bg-blue-600 text-white font-bold"
                  : "bg-transparent text-blue-600"
              }`}
              onClick={() => typeDetails("hybrid")}
            >
              Hybrid
            </button>
            <button
              className={`font-normal px-4 border border-blue-500 rounded-full ${
                type === "wfh"
                  ? "bg-blue-600 text-white font-bold"
                  : "bg-transparent text-blue-600"
              }`}
              onClick={() => typeDetails("wfh")}
            >
              Remote
            </button>
            <button
              className="font-normal px-4 border border-blue-500 rounded-full text-blue-600"
              onClick={() => typeDetails("")}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10">
        {final?.map((data) => {
          return (
            <div key={data.id} className="flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="flex justify-center items-center">
                  <img src={data.logoUrl2} alt="" width="45px" />
                </div>
                <div>
                  <div className="text-base text-blue-600 font-semibold">
                    {data.title}
                  </div>
                  <div className="text-[#1c4980]">
                    {data.organisation?.name}
                  </div>
                </div>
              </div>
              <div className="flex gap-8">
                {data?.jobDetail?.locations[0] && (
                  <div className="border px-4 rounded-lg text-[#1c4980]">
                    {data?.jobDetail?.locations[0]}
                  </div>
                )}
                <div className="flex gap-8">
                  {data?.filters.map((data, i) => {
                    if (data.type == "eligible") {
                      return (
                        <div
                          key={i}
                          className="border px-4 rounded-lg text-[#1c4980]"
                        >
                          {data?.name.split(" ")[0]}
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
              <div className="flex">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-normal h-8 px-3 border border-blue-700 rounded-full">
                  <a href={data.seo_url} target="_blank">
                    Apply
                  </a>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
