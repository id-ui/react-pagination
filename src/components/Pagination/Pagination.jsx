import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

function Pagination({
  pagesCount,
  currentPage,
  onChangePage,
  visiblePagesCount,
  renderLeftControl,
  renderRightControl,
  renderPage,
  pageGroupsDivider,
}) {
  if (pagesCount < 2) {
    return null;
  }

  const handleChange = (newPage) => () => {
    if (newPage !== currentPage) {
      onChangePage(newPage);
    }
  };

  const visiblePagesSequenceLength =
    currentPage <= visiblePagesCount ||
    currentPage > pagesCount - visiblePagesCount
      ? visiblePagesCount - 1
      : visiblePagesCount;

  const getFirstVisiblePageInSequenceIndex = () => {
    if (currentPage < visiblePagesCount) {
      return visiblePagesCount - 1;
    } else if (currentPage > pagesCount - visiblePagesCount) {
      return pagesCount - visiblePagesCount + 1;
    }
    return currentPage - 1;
  };

  const firstVisiblePageInSequenceIndex = getFirstVisiblePageInSequenceIndex();

  return (
    <Fragment>
      {renderLeftControl({
        isDisabled: currentPage === 1,
        onClick: currentPage === 1 ? undefined : handleChange(currentPage - 1),
      })}
      {!visiblePagesCount || pagesCount < visiblePagesCount + 3 ? (
        Array.from({ length: pagesCount }, (_, index) =>
          renderPage({
            key: index,
            number: index + 1,
            isActive: currentPage === index + 1,
            onClick: handleChange(index + 1),
          })
        )
      ) : (
        <Fragment>
          {renderPage({
            key: 0,
            number: 1,
            isActive: currentPage === 1,
            onClick: handleChange(1),
          })}
          {currentPage > visiblePagesCount && pageGroupsDivider}
          {Array.from({ length: visiblePagesSequenceLength }, (_, index) =>
            renderPage({
              key: index + 1,
              number: firstVisiblePageInSequenceIndex + index,
              isActive: currentPage === firstVisiblePageInSequenceIndex + index,
              onClick: handleChange(firstVisiblePageInSequenceIndex + index),
            })
          )}
          {currentPage <= pagesCount - visiblePagesCount && pageGroupsDivider}
          {renderPage({
            key: pagesCount - 1,
            number: pagesCount,
            isActive: currentPage === pagesCount,
            onClick: handleChange(pagesCount),
          })}
        </Fragment>
      )}
      {renderRightControl({
        isDisabled: currentPage === pagesCount,
        onClick:
          currentPage === pagesCount
            ? undefined
            : handleChange(currentPage + 1),
      })}
    </Fragment>
  );
}

Pagination.propTypes = {
  visiblePagesCount: PropTypes.number,
  pagesCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number,
  onChangePage: PropTypes.func,
  renderLeftControl: PropTypes.func,
  renderRightControl: PropTypes.func,
  renderPage: PropTypes.func,
  pageGroupsDivider: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.elementType,
  ]),
};

Pagination.defaultProps = {
  visiblePagesCount: 3,
  currentPage: 1,
  pageGroupsDivider: '...',
  onChangePage: () => {},
  renderLeftControl: () => null,
  renderRightControl: () => null,
  renderPage: ({ number, ...props }) => <span {...props}>{number}</span>,
};

export default Pagination;
