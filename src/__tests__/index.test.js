import React from 'react';
import { render } from '@testing-library/react';
import user from '@testing-library/user-event';
import { axe } from 'jest-axe';
import Pagination from 'components/Pagination';

const commonProps = {
  renderLeftControl: (props) => (
    <span {...props} data-testid="left">
      left
    </span>
  ),
  renderRightControl: (props) => (
    <span {...props} data-testid="right">
      right
    </span>
  ),
  renderPage: ({ number, ...props }) => (
    <span data-testid="page" {...props}>
      {number}
    </span>
  ),
  pageGroupsDivider: <span data-testid="divider">...</span>,
  pagesCount: 10,
};

describe('Pagination', () => {
  it('accessible', async () => {
    const { container } = render(<Pagination {...commonProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('renders elements', () => {
    const { getAllByTestId } = render(
      <Pagination {...commonProps} currentPage={5} />
    );
    [
      ['left', 1],
      ['right', 1],
      ['divider', 2],
      ['page', 5],
    ].forEach(([id, length]) => {
      expect(getAllByTestId(id)).toHaveLength(length);
    });
  });

  it('left control leads to the previous page, right - to the next', () => {
    const onChangePage = jest.fn();
    const currentPage = 5;
    const { getByTestId } = render(
      <Pagination
        {...commonProps}
        currentPage={currentPage}
        onChangePage={onChangePage}
      />
    );
    user.click(getByTestId('left'));
    user.click(getByTestId('right'));
    expect(onChangePage).toHaveBeenCalledTimes(2);
    expect(onChangePage.mock.calls).toEqual([
      [currentPage - 1],
      [currentPage + 1],
    ]);
  });

  it('click on page leads to page', () => {
    const onChangePage = jest.fn();
    const { getByText } = render(
      <Pagination
        {...commonProps}
        currentPage={5}
        onChangePage={onChangePage}
      />
    );
    user.click(getByText('1'));
    expect(onChangePage).toHaveBeenCalledTimes(1);
    expect(onChangePage).toHaveBeenCalledWith(1);
  });

  it('click on current pagedoes nothing', () => {
    const onChangePage = jest.fn();
    const { getByText } = render(
      <Pagination
        {...commonProps}
        currentPage={1}
        onChangePage={onChangePage}
      />
    );
    user.click(getByText('1'));
    expect(onChangePage).toHaveBeenCalledTimes(0);
  });

  it('shows correct pages sequence', () => {
    const { getByText, queryByText, rerender } = render(
      <Pagination {...commonProps} currentPage={1} />
    );

    [1, 2, 3, 10].forEach((page) => {
      expect(getByText(page)).toBeInTheDocument();
    });

    [4, 5, 6, 7, 8, 9].forEach((page) => {
      expect(queryByText(page)).not.toBeInTheDocument();
    });

    rerender(<Pagination {...commonProps} currentPage={5} />);

    [1, 4, 5, 6, 10].forEach((page) => {
      expect(getByText(page)).toBeInTheDocument();
    });

    [2, 3, 7, 8, 9].forEach((page) => {
      expect(queryByText(page)).not.toBeInTheDocument();
    });

    rerender(<Pagination {...commonProps} currentPage={10} />);

    [1, 8, 9, 10].forEach((page) => {
      expect(getByText(page)).toBeInTheDocument();
    });

    [2, 3, 4, 5, 6, 7].forEach((page) => {
      expect(queryByText(page)).not.toBeInTheDocument();
    });

    rerender(<Pagination {...commonProps} pagesCount={4} />);

    [1, 2, 3, 4].forEach((page) => {
      expect(getByText(page)).toBeInTheDocument();
    });

    rerender(<Pagination visiblePagesCount={0} pagesCount={10} />);

    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach((page) => {
      expect(getByText(page)).toBeInTheDocument();
    });
  });

  it('should not render if pagesCount < 2', () => {
    const { container } = render(
      <Pagination {...commonProps} pagesCount={1} />
    );
    expect(container).toBeEmptyDOMElement();
  });
});
