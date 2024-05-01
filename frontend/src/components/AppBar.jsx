import React from "react";

export default function AppBar() {
  return (
    <div>
      <div className="p-2 m-2 grid grid-cols-12 shadow h-14">
        <div className=" col-span-6 text-left font-bold text-3xl">
          Payments App
        </div>
        <div className="col-span-6 text-right">
          <div className="flex justify-end">
            <div className=" pr-6 pt-4 text-xl">Hello, Shubham</div>
            <div>
              <img
                src="https://lh3.googleusercontent.com/ogw/AF2bZyiDN7Lpe0RRKf-3OH5hwz1pFIDJ1NLveory-kdh4Q7m2kQ=s64-c-mo"
                alt="Your image"
                className="rounded-full w-12 h-12 "
              ></img>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="shadow h-14 flex justify-between">
    //     <div className="flex flex-col justify-center h-full ml-4">
    //         PayTM App
    //     </div>
    //     <div className="flex">
    //         <div className="flex flex-col justify-center h-full mr-4">
    //             Hello
    //         </div>
    //         <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
    //             <div className="flex flex-col justify-center h-full text-xl">
    //                 U
    //             </div>
    //         </div>
    //     </div>
    // </div>
  );
}
