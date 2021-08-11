import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core"
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Comic = {
  __typename?: "Comic"
  date?: Maybe<Scalars["Int"]>
  description?: Maybe<Scalars["String"]>
  grade: Grade
  grade_id: Scalars["Int"]
  id: Scalars["ID"]
  issue_no?: Maybe<Scalars["Int"]>
  title: Title
  title_id: Scalars["Int"]
}

export type ComicsPage = {
  __typename?: "ComicsPage"
  items?: Maybe<Array<Maybe<Comic>>>
  pageInfo?: Maybe<PageInfo>
  totalCount: Scalars["Int"]
}

export type Grade = {
  __typename?: "Grade"
  abbr: Scalars["String"]
  id: Scalars["Int"]
  name: Scalars["String"]
  score: Scalars["Float"]
}

export type Mutation = {
  __typename?: "Mutation"
  updateTitle?: Maybe<Title>
}

export type MutationUpdateTitleArgs = {
  id: Scalars["Int"]
  update: UpdateTitleInput
}

export type PageInfo = {
  __typename?: "PageInfo"
  endCursor?: Maybe<Scalars["String"]>
  hasNextPage?: Maybe<Scalars["Boolean"]>
  startCursor?: Maybe<Scalars["String"]>
}

export type Publisher = {
  __typename?: "Publisher"
  id: Scalars["ID"]
  name: Scalars["String"]
  titles?: Maybe<Array<Maybe<Title>>>
  url?: Maybe<Scalars["String"]>
}

export type PublishersPage = {
  __typename?: "PublishersPage"
  items?: Maybe<Array<Maybe<Publisher>>>
  pageInfo?: Maybe<PageInfo>
  totalCount: Scalars["Int"]
}

export type Query = {
  __typename?: "Query"
  comic?: Maybe<Comic>
  comics?: Maybe<ComicsPage>
  publisher?: Maybe<Publisher>
  publishers?: Maybe<PublishersPage>
  title?: Maybe<Title>
  titles?: Maybe<TitlesPage>
}

export type QueryComicArgs = {
  id: Scalars["Int"]
}

export type QueryComicsArgs = {
  afterCursor?: Maybe<Scalars["String"]>
  beforeCursor?: Maybe<Scalars["String"]>
  pageSize?: Maybe<Scalars["Int"]>
  publisherId?: Maybe<Scalars["Int"]>
  titleId?: Maybe<Scalars["Int"]>
}

export type QueryPublisherArgs = {
  id: Scalars["Int"]
}

export type QueryPublishersArgs = {
  afterCursor?: Maybe<Scalars["String"]>
  beforeCursor?: Maybe<Scalars["String"]>
  pageSize?: Maybe<Scalars["Int"]>
}

export type QueryTitleArgs = {
  id: Scalars["Int"]
}

export type QueryTitlesArgs = {
  afterCursor?: Maybe<Scalars["String"]>
  beforeCursor?: Maybe<Scalars["String"]>
  pageSize?: Maybe<Scalars["Int"]>
  publisherId?: Maybe<Scalars["String"]>
}

export type Title = {
  __typename?: "Title"
  id: Scalars["ID"]
  issues?: Maybe<Scalars["Int"]>
  name: Scalars["String"]
  publisher: Publisher
  publisher_id: Scalars["Int"]
  url?: Maybe<Scalars["String"]>
  volume?: Maybe<Scalars["Int"]>
  year?: Maybe<Scalars["Int"]>
}

export type TitlesPage = {
  __typename?: "TitlesPage"
  items?: Maybe<Array<Maybe<Title>>>
  pageInfo?: Maybe<PageInfo>
  totalCount: Scalars["Int"]
}

export type UpdateTitleInput = {
  name?: Maybe<Scalars["String"]>
  publisher_id?: Maybe<Scalars["Int"]>
  url?: Maybe<Scalars["String"]>
  volume?: Maybe<Scalars["Int"]>
  year?: Maybe<Scalars["Int"]>
}

export type UpdateTitleMutationVariables = Exact<{
  id: Scalars["Int"]
  update: UpdateTitleInput
}>

export type UpdateTitleMutation = {
  __typename?: "Mutation"
  updateTitle?: Maybe<{
    __typename?: "Title"
    id: string
    name: string
    publisher_id: number
    volume?: Maybe<number>
    year?: Maybe<number>
  }>
}

export type GetComicsQueryVariables = Exact<{
  pageSize?: Maybe<Scalars["Int"]>
  afterCursor?: Maybe<Scalars["String"]>
  beforeCursor?: Maybe<Scalars["String"]>
  titleId?: Maybe<Scalars["Int"]>
  publisherId?: Maybe<Scalars["Int"]>
}>

export type GetComicsQuery = {
  __typename?: "Query"
  comics?: Maybe<{
    __typename?: "ComicsPage"
    totalCount: number
    items?: Maybe<
      Array<
        Maybe<{
          __typename?: "Comic"
          id: string
          issue_no?: Maybe<number>
          description?: Maybe<string>
          grade: {
            __typename?: "Grade"
            id: number
            abbr: string
            name: string
            score: number
          }
          title: {
            __typename?: "Title"
            id: string
            name: string
            volume?: Maybe<number>
            year?: Maybe<number>
            publisher: { __typename?: "Publisher"; id: string; name: string }
          }
        }>
      >
    >
    pageInfo?: Maybe<{
      __typename?: "PageInfo"
      startCursor?: Maybe<string>
      endCursor?: Maybe<string>
      hasNextPage?: Maybe<boolean>
    }>
  }>
}

export type GetComicQueryVariables = Exact<{
  id: Scalars["Int"]
}>

export type GetComicQuery = {
  __typename?: "Query"
  comic?: Maybe<{
    __typename?: "Comic"
    id: string
    issue_no?: Maybe<number>
    description?: Maybe<string>
    grade: {
      __typename?: "Grade"
      id: number
      abbr: string
      name: string
      score: number
    }
    title: {
      __typename?: "Title"
      id: string
      name: string
      publisher: { __typename?: "Publisher"; id: string; name: string }
    }
  }>
}

export type GetPublisherQueryVariables = Exact<{
  id: Scalars["Int"]
}>

export type GetPublisherQuery = {
  __typename?: "Query"
  publisher?: Maybe<{
    __typename?: "Publisher"
    id: string
    name: string
    url?: Maybe<string>
    titles?: Maybe<
      Array<
        Maybe<{
          __typename?: "Title"
          id: string
          name: string
          url?: Maybe<string>
          year?: Maybe<number>
          volume?: Maybe<number>
        }>
      >
    >
  }>
}

export type GetTitlesQueryVariables = Exact<{
  pageSize?: Maybe<Scalars["Int"]>
  afterCursor?: Maybe<Scalars["String"]>
  beforeCursor?: Maybe<Scalars["String"]>
}>

export type GetTitlesQuery = {
  __typename?: "Query"
  titles?: Maybe<{
    __typename?: "TitlesPage"
    totalCount: number
    items?: Maybe<
      Array<
        Maybe<{
          __typename?: "Title"
          id: string
          name: string
          url?: Maybe<string>
          year?: Maybe<number>
          volume?: Maybe<number>
          publisher: {
            __typename?: "Publisher"
            id: string
            name: string
            url?: Maybe<string>
          }
        }>
      >
    >
    pageInfo?: Maybe<{
      __typename?: "PageInfo"
      startCursor?: Maybe<string>
      endCursor?: Maybe<string>
      hasNextPage?: Maybe<boolean>
    }>
  }>
}

export type GetTitleQueryVariables = Exact<{
  id: Scalars["Int"]
  pageSize?: Maybe<Scalars["Int"]>
}>

export type GetTitleQuery = {
  __typename?: "Query"
  title?: Maybe<{
    __typename?: "Title"
    id: string
    name: string
    url?: Maybe<string>
    year?: Maybe<number>
    volume?: Maybe<number>
    publisher: {
      __typename?: "Publisher"
      id: string
      name: string
      url?: Maybe<string>
    }
  }>
  comics?: Maybe<{
    __typename?: "ComicsPage"
    totalCount: number
    items?: Maybe<
      Array<
        Maybe<{
          __typename?: "Comic"
          id: string
          issue_no?: Maybe<number>
          description?: Maybe<string>
          grade: {
            __typename?: "Grade"
            id: number
            abbr: string
            name: string
            score: number
          }
        }>
      >
    >
    pageInfo?: Maybe<{
      __typename?: "PageInfo"
      startCursor?: Maybe<string>
      endCursor?: Maybe<string>
      hasNextPage?: Maybe<boolean>
    }>
  }>
}

export type GetTitleEditQueryVariables = Exact<{
  id: Scalars["Int"]
  pageSize?: Maybe<Scalars["Int"]>
}>

export type GetTitleEditQuery = {
  __typename?: "Query"
  title?: Maybe<{
    __typename?: "Title"
    id: string
    name: string
    url?: Maybe<string>
    year?: Maybe<number>
    volume?: Maybe<number>
    publisher_id: number
  }>
  publishers?: Maybe<{
    __typename?: "PublishersPage"
    totalCount: number
    items?: Maybe<
      Array<Maybe<{ __typename?: "Publisher"; id: string; name: string }>>
    >
    pageInfo?: Maybe<{
      __typename?: "PageInfo"
      startCursor?: Maybe<string>
      endCursor?: Maybe<string>
      hasNextPage?: Maybe<boolean>
    }>
  }>
}

export const UpdateTitleDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateTitle" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "update" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UpdateTitleInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateTitle" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "update" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "update" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "publisher_id" },
                },
                { kind: "Field", name: { kind: "Name", value: "volume" } },
                { kind: "Field", name: { kind: "Name", value: "year" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateTitleMutation, UpdateTitleMutationVariables>
export const GetComicsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetComics" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "pageSize" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "afterCursor" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "beforeCursor" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "titleId" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "publisherId" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "comics" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "pageSize" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "pageSize" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "afterCursor" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "afterCursor" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "beforeCursor" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "beforeCursor" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "titleId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "titleId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "publisherId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "publisherId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "totalCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "items" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "issue_no" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "grade" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "abbr" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "score" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "title" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "volume" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "year" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "publisher" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "startCursor" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "endCursor" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "hasNextPage" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetComicsQuery, GetComicsQueryVariables>
export const GetComicDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetComic" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "comic" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "issue_no" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "grade" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "abbr" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "score" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "title" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "publisher" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetComicQuery, GetComicQueryVariables>
export const GetPublisherDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetPublisher" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "publisher" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "titles" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "url" } },
                      { kind: "Field", name: { kind: "Name", value: "year" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "volume" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetPublisherQuery, GetPublisherQueryVariables>
export const GetTitlesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetTitles" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "pageSize" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "afterCursor" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "beforeCursor" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "titles" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "pageSize" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "pageSize" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "afterCursor" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "afterCursor" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "beforeCursor" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "beforeCursor" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "totalCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "items" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "url" } },
                      { kind: "Field", name: { kind: "Name", value: "year" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "volume" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "publisher" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "url" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "startCursor" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "endCursor" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "hasNextPage" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetTitlesQuery, GetTitlesQueryVariables>
export const GetTitleDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetTitle" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "pageSize" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          defaultValue: { kind: "IntValue", value: "1000" },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "title" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
                { kind: "Field", name: { kind: "Name", value: "year" } },
                { kind: "Field", name: { kind: "Name", value: "volume" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "publisher" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "url" } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "comics" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "titleId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "pageSize" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "pageSize" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "totalCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "items" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "issue_no" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "grade" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "abbr" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "score" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "startCursor" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "endCursor" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "hasNextPage" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetTitleQuery, GetTitleQueryVariables>
export const GetTitleEditDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetTitleEdit" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "pageSize" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          defaultValue: { kind: "IntValue", value: "1000" },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "title" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
                { kind: "Field", name: { kind: "Name", value: "year" } },
                { kind: "Field", name: { kind: "Name", value: "volume" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "publisher_id" },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "publishers" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "pageSize" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "pageSize" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "totalCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "items" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "startCursor" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "endCursor" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "hasNextPage" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetTitleEditQuery, GetTitleEditQueryVariables>
