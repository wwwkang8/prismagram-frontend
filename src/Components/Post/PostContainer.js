import React, { useState, useEffect } from "react";
import { useMutation } from "react-apollo-hooks";
import PostPresenter from "./PostPresenter";
import PropTypes from "prop-types";
import useInput from "../../Hooks/useInput";
import { TOGGLE_LIKE, ADD_COMMENT } from "./PostQueries";

// 입력받은 매개인자
const PostContainer = ({id, 
                        user, 
                        files, /** 사진id, url이 배열로 존재*/
                        likeCount,
                        isLiked,
                        comments,
                        createdAt,
                        caption,
                        location}) => {
    
    const [isLikedState, setIsLiked] = useState(isLiked);
    const [likeCountState, setLikeCount] = useState(likeCount);
    const [currentItem, setCurrentItem] = useState(0);
    const comment = useInput("");

    //useMutation을 사용하면 반환할때 함수, 데이터를 배열로 반환 --> 이부분 확인하기
    const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
        variables: { postId: id }
    });
    const [addCommentMutation] = useMutation(ADD_COMMENT, {
        variables: { postId: id, text: comment.value }
    });

    const slide = () => {
        // files 배열의 총 길이 구한다
        const totalFiles = files.length;

        if(currentItem === totalFiles - 1){ // 사진이 오직 1장이라면 3초 후에도 현재 사진을 보여준다
            setTimeout(() => setCurrentItem(0), 3000);
        }else{ // 사진이 2장이상이라면 3초후에는 다음 배열의 사진을 보여준다
            setTimeout(() => setCurrentItem(currentItem + 1), 3000);
        }
    };


    // useEffect : 컴포넌트가 렌더링될 때마다 currentItem +1씩 하여 사진을 변경
    useEffect(() => {
        slide();
    }, [currentItem]);

    const toggleLike = async () => {
        
        if(isLikedState === true){
            setIsLiked(false);
            setLikeCount(likeCountState - 1);
        }else{
            setIsLiked(true);
            setLikeCount(likeCountState + 1);
        }

        toggleLikeMutation();
    };

    const onKeyPress = e => {
        const { keyCode } = e;

        if(keyCode === 13){
          comment.setValue("");
         addCommentMutation();
        }

        return;
    };


    return (
        <PostPresenter
            user={user}
            files={files}
            likeCount={likeCountState}
            isLiked={isLikedState}
            comments={comments}
            createdAt={createdAt}
            newComment={comment}
            setIsLiked={setIsLiked}
            setLikeCount={setLikeCount}
            currentItem={currentItem}
            toggleLike={toggleLike}
            onKeyPress={onKeyPress}
        />

    );
}

PostContainer.propTypes = {
    id:PropTypes.string.isRequired,
    user:PropTypes.PropTypes.shape({
        id: PropTypes.string.isRequired,
        avatar:PropTypes.string,
        userName:PropTypes.string.isRequired
    }).isRequired, 
    files:PropTypes.arrayOf(PropTypes.shape({
            id:PropTypes.string.isRequired,
            url:PropTypes.string.isRequired
        })
    ).isRequired,
    likeCount:PropTypes.number.isRequired,
    isLiked:PropTypes.bool.isRequired,
    comments:PropTypes.arrayOf(PropTypes.shape({
        id:PropTypes.string.isRequired,
        text:PropTypes.string.isRequired,
        user:PropTypes.shape({
            id:PropTypes.string.isRequired,
            userName:PropTypes.string.isRequired
        }).isRequired
    })).isRequired,
    createdAt:PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    location: PropTypes.string
};

export default PostContainer;
