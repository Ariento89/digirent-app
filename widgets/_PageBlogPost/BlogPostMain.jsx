/* eslint-disable react-hooks/exhaustive-deps */
import Spinner from 'components/Spinner/index';
import { useState } from 'react';
import { request } from 'shared/types';
import Reaction from 'widgets/Reaction/index';
import SocialMedias from 'widgets/SocialMedias/index';
import dayjs from 'dayjs';

const BlogPostMain = ({ blogPost, status, onShowComment }) => {
  // STATES
  const [reaction, setReaction] = useState(null);

  // VARIABLES
  const dateCreated = dayjs(blogPost.createdAt);

  return (
    <div className="col-12 col-lg-8">
      <div className="main-box blog-content-wrapper pb-5">
        <Spinner loadingText="Fetching blog post..." isLoading={status === request.REQUESTING}>
          <div className="blog-header">
            <SocialMedias />

            <div className="statistics">
              <div className="item">
                <img src="/images/icon/icon-comment-primary.svg" alt="item icon" />
                <span className="text-primary">103</span>
              </div>

              <div className="item">
                <img src="/images/icon/icon-like-active.svg" alt="item icon" />
                <span className="text-primary">502</span>
              </div>
            </div>
          </div>

          <div className="blog-image">
            <img className="bottom-design" src="/images/blog-round-line.svg" alt="outline" />
            <div className="overlay" />
            <div className="date">
              <span className="font-weight-bold">{dateCreated?.format('DD')}</span>{' '}
              {dateCreated?.format('MMM')}
              <span className="year">{dateCreated.format('YYYY')}</span>
            </div>
          </div>

          <div className="blog-texts px-0 px-sm-4">
            <h3 className="main-title-2">{blogPost?.title}</h3>
            <p className="main-desc mt-4 mt-sm-5">{blogPost?.content}</p>
          </div>

          <Reaction
            reaction={reaction}
            onReact={(value) => setReaction(value)}
            classNames="mt-5"
            likeIconClassNames="mx-2"
            dislikeIconClassNames="mx-2"
          />

          <div className="add-comment button-hover" onClick={onShowComment}>
            <img
              data-type="like"
              src="/images/icon/icon-comment-white.svg"
              className="icon-like"
              alt="item icon"
            />
          </div>
        </Spinner>
      </div>
    </div>
  );
};

export default BlogPostMain;
