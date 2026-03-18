import React, { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import { tagsList } from '../Tags/tagList';
import './Search.css';

const Search = ({ slideIn, onClose }) => {
  const [searchParams] = useSearchParams();
  const searchValue = (searchParams.get('q') || '').trim();
  const query = searchValue.toLowerCase();
  const questions = useSelector((state) => state.questionReducer?.data || []);

  const matchingQuestions = useMemo(() => {
    if (!query) return [];

    return questions.filter((question) => {
      const haystack = [
        question.questionTitle,
        question.questionBody,
        question.userPosted,
        ...(question.questionTags || []),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [questions, query]);

  const matchingTags = useMemo(() => {
    if (!query) return [];

    const fromQuestions = new Map();
    questions.forEach((question) => {
      (question.questionTags || []).forEach((tag) => {
        const normalized = String(tag).toLowerCase();
        const previous = fromQuestions.get(normalized) || 0;
        fromQuestions.set(normalized, previous + 1);
      });
    });

    const staticTagMap = new Map(
      tagsList.map((tag) => [tag.tagName.toLowerCase(), tag])
    );

    fromQuestions.forEach((count, normalizedTag) => {
      if (!staticTagMap.has(normalizedTag)) {
        staticTagMap.set(normalizedTag, {
          tagName: normalizedTag,
          tagDesc: `Community tag with ${count} related question${count > 1 ? 's' : ''}.`,
        });
      }
    });

    return Array.from(staticTagMap.values())
      .map((tag) => ({
        ...tag,
        questionsCount: fromQuestions.get(tag.tagName.toLowerCase()) || 0,
      }))
      .filter((tag) => {
        const text = `${tag.tagName} ${tag.tagDesc}`.toLowerCase();
        return text.includes(query);
      });
  }, [questions, query]);

  return (
    <div className='home-container-1'>
      <LeftSidebar slideIn={slideIn} onClose={onClose} />
      <div className='home-container-2 search-page'>
        <h1>Search</h1>
        <p className='search-subtitle'>
          {searchValue ? `Results for "${searchValue}"` : 'Type in the top search bar to find questions and tags.'}
        </p>

        {searchValue && (
          <>
            <section className='search-section'>
              <h2>Questions ({matchingQuestions.length})</h2>
              {matchingQuestions.length === 0 ? (
                <p>No questions matched your search.</p>
              ) : (
                <div className='search-list'>
                  {matchingQuestions.map((question) => (
                    <article className='search-card' key={question._id}>
                      <Link className='search-title' to={`/Questions/${question._id}`}>
                        {question.questionTitle}
                      </Link>
                      <div className='search-tags'>
                        {(question.questionTags || []).map((tag) => (
                          <span className='search-tag' key={`${question._id}-${tag}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>

            <section className='search-section'>
              <h2>Tags ({matchingTags.length})</h2>
              {matchingTags.length === 0 ? (
                <p>No tags matched your search.</p>
              ) : (
                <div className='search-list'>
                  {matchingTags.map((tag) => (
                    <article className='search-card' key={tag.tagName}>
                      <h3 className='search-tag-title'>{tag.tagName}</h3>
                      <p>{tag.tagDesc}</p>
                      <small>Related questions: {tag.questionsCount}</small>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
