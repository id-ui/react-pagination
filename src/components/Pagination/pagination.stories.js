import React, { Fragment, useState } from 'react';
import { withPropsTable } from 'storybook-addon-react-docgen';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';
import Pagination from './Pagination';

export default {
  title: 'Pagination',
  component: Pagination,
  argTypes: {
    visiblePagesCount: {
      control: 'number',
      description: 'count of visible pages in the center of pagination',
      defaultValue: 3,
      table: { defaultValue: { summary: 3 } },
    },
    pagesCount: { control: 'number', description: 'count of pages' },
    currentPage: { control: 'number', description: 'active page' },
    onChangePage: {
      action: 'onChangePage',
      description: 'onChangePage(newCurrentPage)',
    },
    renderLeftControl: {
      disable: true,
      description:
        'render function called with left control props ({onClick: "go to previous page"})',
      table: {
        defaultValue: { summary: '() => null' },
      },
    },
    renderRightControl: {
      disable: true,
      description:
        'render function called with left control props ({onClick: "go to next page"})',
      table: {
        defaultValue: { summary: '() => null' },
      },
    },
    renderPage: {
      disable: true,
      description:
        'render function called with page props ({key: "React key", onClick: "go to this page", number: "page number", isActive: "is page active"})',
      table: {
        defaultValue: {
          summary: '({ number, ...props }) => <span {...props}>{number}</span>',
        },
      },
    },
    pageGroupsDivider: {
      control: 'text',
      description: 'pageGroups pageGroupsDivider (element or string)',
      defaultValue: '...',
      table: {
        defaultValue: {
          summary: '...',
        },
      },
    },
  },
  decorators: [withPropsTable],
  parameters: {
    props: {
      propTablesInclude: [Pagination],
    },
  },
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Page = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  line-height: 1.4rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 0.35rem;
  }
  ${ifProp(
    'isActive',
    css`
      color: #ffffff;
      background-color: #580b9e;
    `,
    css`
      color: #666666;
      &:hover {
        color: #000000;
      }
    `
  )}
`;

const Control = styled.span`
  font-size: 1.4rem;
  cursor: pointer;
  &:first-child {
    margin-right: 1rem;
    transform: scaleY(-1) rotate(-180deg);
  }
  &:last-child {
    margin-left: 1rem;
  }
`;

const Divider = styled.span`
  margin: 0 0.5rem;
`;

export function CustomPagination(props) {
  const [page, setPage] = useState(1);

  return (
    <Container>
      <Pagination
        {...props}
        currentPage={page}
        onChangePage={setPage}
        renderLeftControl={(props) => <Control {...props}>☞</Control>}
        renderRightControl={(props) => <Control {...props}>☞</Control>}
        renderPage={({ number, ...props }) => <Page {...props}>{number}</Page>}
        pageGroupsDivider={<Divider>...</Divider>}
      />
    </Container>
  );
}

CustomPagination.args = {
  pagesCount: 10,
};

const SliderPaginationPage = styled(Page)`
  background-color: ${ifProp('isActive', '#580B9E', '#9552D4')};
`;

const Info = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

export function SliderPagination(props) {
  const [page, setPage] = useState(1);

  return (
    <Fragment>
      <Info>currentPage: {page}</Info>
      <Container>
        <Pagination
          {...props}
          currentPage={page}
          onChangePage={setPage}
          renderPage={(props) => <SliderPaginationPage {...props} />}
        />
      </Container>
    </Fragment>
  );
}

SliderPagination.args = {
  pagesCount: 5,
  visiblePagesCount: 0,
};
