{
  data &&
    data.getAllQuestions.map((q, index) => {
      return (
        <div className="flex flex-col">
          <div
            key={index}
            className="greyProfileBox my-12 w-64  max-w-md  rounded-2xl bg-[#EDE9E6]"
          >
            <div className="profileBoxHeader rounded-xl bg-black p-2 text-lg font-medium text-white">
              <p>{q.title}</p>
            </div>
            <div className="p-2">
              <p>{q.module}</p>

              <p>{q.github_repo}</p>
            </div>
          </div>
        </div>
      );
    });
}
