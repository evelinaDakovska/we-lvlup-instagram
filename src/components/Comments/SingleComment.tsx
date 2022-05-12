import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ReplyIcon from "@mui/icons-material/Reply";
import { useState, useEffect } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { likeHandlerComments } from "utils/postSettings/likeHandler";
import { getUserAvatar } from "utils/userSettings/userAuth";
import CommentInput from "./CommentInput";

function SingleComment(props: any): JSX.Element {
  const { currentComment } = props;
  const { postId } = props;
  const { currentId } = props;
  const [likedComment, setLikedComment] = useState(false);
  const [replyInput, setReplyInput] = useState(false);
  const [likes, setLikes] = useState<Array<string>>([]);
  const [avatar, setAvatar] = useState("");
  const currentUserId = useSelector(
    (state: RootStateOrAny) => state.auth.userId
  );

  useEffect(() => {
    const getAvatar = async () => {
      const currentAvatar = await getUserAvatar(currentComment.userId);
      setAvatar(currentAvatar);
    };
    getAvatar();
    setLikes(currentComment.likes);
    if (currentComment.likes.includes(currentUserId)) {
      setLikedComment(true);
    }
  }, []);

  function likeBtnHandler() {
    setLikedComment((prevValue: boolean) => !prevValue);
    if (likes.includes(currentUserId)) {
      const indexIds = likes.indexOf(currentUserId);
      const likesArray = [...likes];
      likesArray.splice(indexIds, 1);
      setLikes(likesArray);
    } else {
      setLikes((prev) => [...prev, currentUserId]);
    }
    likeHandlerComments(currentId, currentUserId);
  }

  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="avatar" src={avatar} />
        </ListItemAvatar>
        <ListItemText
          sx={{ overflow: "auto" }}
          primary={
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {currentComment.firstName} {currentComment.lastName}
              <div>
                <Tooltip title="Reply" arrow placement="bottom-start">
                  <ReplyIcon
                    onClick={() => {
                      setReplyInput((prev) => !prev);
                    }}
                  />
                </Tooltip>
                <Tooltip title="Like" arrow placement="bottom-start">
                  <FavoriteBorderIcon
                    sx={
                      likedComment
                        ? { color: "red", cursor: "pointer" }
                        : { cursor: "pointer" }
                    }
                    onClick={() => likeBtnHandler()}
                  />
                </Tooltip>
              </div>
            </div>
          }
          secondary={
            <Typography
              sx={{ display: "inline", wordWrap: "break-word" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {currentComment.comment}
              {replyInput ? (
                <CommentInput postId={postId} parentCommentId={currentId} />
              ) : null}
            </Typography>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
}

export default SingleComment;
