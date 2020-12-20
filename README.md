# Pagination React Component

[![NPM](https://img.shields.io/npm/v/@idui/react-pagination.svg)](https://www.npmjs.com/package/@idui/react-pagination/)
[![Size](https://img.shields.io/bundlephobia/min/@idui/react-pagination)](https://www.npmjs.com/package/@idui/react-pagination) 
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) 
[![Coverage Status](https://coveralls.io/repos/github/id-ui/react-pagination/badge.svg?branch=main)](https://coveralls.io/github/id-ui/react-pagination?branch=main) 
[![LICENSE](https://img.shields.io/github/license/id-ui/react-pagination)](https://github.com/id-ui/react-pagination/blob/main/LICENSE)

- [Docs](https://id-ui.github.io/react-pagination/?path=/docs/pagination--custom-pagination)
- [Playground](https://id-ui.github.io/react-pagination/?path=/story/pagination--custom-pagination)

## Install

```bash
npm install --save @idui/react-pagination
```

```bash
yarn add @idui/react-pagination
```

### Advantages
- Versatile and fully customizable pagination
- Custom rendering of all components (page, controls, divider of pageGroups)


### See props in [Docs](https://id-ui.github.io/react-pagination/?path=/docs/pagination--custom-pagination)


### Pagination with page numbers

- [Live Example](https://id-ui.github.io/react-pagination/?path=/story/pagination--custom-pagination)

```jsx
import React from 'react'
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';
import Pagination from '@idui/react-pagination'

export function CustomPaginationWithPageNumbers(props) {
    const [page, setPage] = useState(1);

    return (
        <Container>
            <Pagination
                currentPage={page}
                onChangePage={setPage}
                pagesCount={10}
                visiblePagesCount={3}
                renderLeftControl={(props) => <Control {...props}>☞</Control>}
                renderRightControl={(props) => <Control {...props}>☞</Control>}
                renderPage={({ number, ...props }) => <Page {...props}>{number}</Page>}
                pageGroupsDivider={<Divider>...</Divider>}
            />
        </Container>
    );
}

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
      background-color: #0d4c0e;
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
```

### Pagination without page numbers (for example for Slider)

- [Live Example](https://id-ui.github.io/react-pagination/?path=/story/pagination--slider-pagination)

```jsx
import React from 'react'
import styled from 'styled-components';
import { ifProp } from 'styled-tools';
import Pagination from '@idui/react-pagination'

export function CustomPaginationWithPageNumbers(props) {
    const [page, setPage] = useState(1);

    return (
        <Container>
            <Pagination
                currentPage={page}
                onChangePage={setPage}
                pagesCount={5}
                visiblePagesCount={0}
                renderPage={(props) => <Page {...props} />}
            />
        </Container>
    );
}

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
  background-color: ${ifProp('isActive', '#0d4c0e', '#507350')};
`;
```

### See more details in [storybook](https://id-ui.github.io/react-pagination/?path=/docs/pagination--custom-pagination)

## License

MIT © [kaprisa57@gmail.com](https://github.com/id-ui)