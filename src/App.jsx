import { useEffect, useState } from "react";
const CommentInput = ({ onClick, replies }) => {
  const [commentInput, setCommentInput] = useState("");
  return (
    <div
      className={`flex  ${
        replies
          ? "border-2 border-l-zinc-700 rounded-lg p-4 gap-2"
          : " flex-col justify-center"
      }`}
    >
      <input
        type="text"
        placeholder="What's your thought in this"
        value={commentInput}
        onChange={(e) => setCommentInput(e.target.value)}
        className="w-3/4 p-3 text-black text-[1.1rem] focus:outline-none border-[1px] border-zinc-400 rounded-md"
      />
      <button
        className="rounded-full border-[1px] border-black p-2  w-40"
        onClick={() => {
          onClick?.(commentInput);
          setCommentInput("");
        }}
      >
        Comment
      </button>
    </div>
  );
};
const CommentItem = ({ comment, replies }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [repliesArr, setRepliesArr] = useState(replies);
  const handleClick = (newComment) => {
    setRepliesArr((prev) => {
      return [
        {
          comment: newComment,
          replies: [],
          id: Math.floor(Math.random() * 999999 + 1),
        },
        ...prev,
      ];
    });
    setIsReplying(false);
  };

  return (
    <div className="border-2 border-l-zinc-700 flex flex-col gap-2 p-4 rounded-lg w-full">
      <p className=" p-1 text-lg font-semibold rounded-lg">{comment.comment}</p>
      <button
        className="rounded-full border-[1px] border-black p-2 mt-2 w-40"
        onClick={() => setIsReplying(!isReplying)}
      >
        {isReplying ? "Cancel" : "Reply"}
      </button>
      {isReplying && <CommentInput replies onClick={handleClick} />}
      {repliesArr.length > 0 &&
        repliesArr.map((comment) => (
          <CommentItem
            comment={comment}
            key={comment.id}
            replies={comment.replies}
          />
        ))}
    </div>
  );
};

function App() {
  const [commentsArr, setCommentsArr] = useState([]);

  const handleClick = (commentInput) => {
    if (commentInput === "") return;
    setCommentsArr([
      {
        comment: commentInput,
        replies: [],
        id: Math.floor(Math.random() * 999999 + 1),
      },
      ...commentsArr,
    ]);
  };

  return (
    <div className="w-full h-screen p-4 flex flex-col gap-2 ">
      <h2 className="text-3xl font-bold">React nested comments</h2>
      <CommentInput onClick={handleClick} />
      <div className="w-3/4 flex flex-col gap-2 mt-8 self-center">
        {commentsArr.length > 0 &&
          commentsArr.map((comment, i) => {
            console.log(comment.id);
            return (
              <CommentItem
                comment={comment}
                key={comment.id}
                replies={comment.replies}
              />
            );
          })}
      </div>
    </div>
  );
}

export default App;
