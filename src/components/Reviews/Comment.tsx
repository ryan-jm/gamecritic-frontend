import {
  EuiCommentList,
  EuiLoadingContent,
  EuiPanel,
  EuiSpacer,
  EuiText,
  EuiTextArea,
  EuiButtonIcon,
  EuiAvatar,
  EuiHorizontalRule,
  EuiFlexGroup,
} from "@elastic/eui";
import React from "react";
import * as API from "../../api/Reviews";
import { useAuth } from "../../stores/AuthContext";
import { Comment as IComment } from "../../types/review.types";

interface ICommentProps {
  reviewId: number | undefined;
}

const Comment = ({ reviewId }: ICommentProps) => {
  const { user } = useAuth();
  const [reviewComments, setReviewComments] =
    React.useState<Array<IComment> | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchComments = async () => {
      API.validate(user?.token ?? "");
      const comments = await API.getReviewComments(reviewId);
      setReviewComments(comments);
      setIsLoading(false);
    };

    fetchComments();
  }, [reviewId, user?.token]);

  return (
    <EuiPanel
      paddingSize="l"
      hasShadow={false}
      color="subdued"
      style={{ width: "100%" }}
    >
      {isLoading ? (
        <p style={{ width: "35rem" }}>
          <EuiLoadingContent lines={2} />
          <EuiSpacer size="l" />
          <EuiLoadingContent lines={2} />
          <EuiSpacer size="l" />
          <EuiLoadingContent lines={2} />
        </p>
      ) : (
        <EuiCommentList
          comments={reviewComments?.map((comment) => {
            return {
              username: comment.author,
              event: "commented",
              timestamp: `on ${new Date(comment?.created_at).toDateString()}`,
              timelineIcon: (
                <EuiAvatar
                  imageUrl={comment?.avatar_url ?? ""}
                  name={comment.author}
                />
              ),
              children: (
                <EuiText size="s">
                  <p>{comment.body}</p>
                </EuiText>
              ),
            };
          })}
        />
      )}
      <EuiHorizontalRule size="half" />
      <EuiTextArea fullWidth placeholder="Write a comment..." />
      <EuiSpacer />
      <EuiFlexGroup justifyContent="flexEnd">
        <EuiButtonIcon iconType="arrowRight" display="empty" color="accent" />
      </EuiFlexGroup>
    </EuiPanel>
  );
};

export default Comment;