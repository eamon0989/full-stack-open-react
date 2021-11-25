import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author but not likes and url', () => {
  const blog = {
    likes: 10,
    title: 'This is a test blog',
    url: 'me.com',
    author: 'Me'
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'This is a test blog', 'Me'
  )

  expect(component.container).not.toHaveTextContent(
    'me.com', 10
  )

  const button = component.container.querySelector('button')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'me.com', 10
  )
})

test('renders likes and url after button click', () => {
  const blog = {
    likes: 10,
    title: 'This is a test blog',
    url: 'me.com',
    author: 'Me'
  }

  const component = render(
    <Blog blog={blog} />
  )

  const button = component.container.querySelector('button')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'me.com', 10
  )
})

test('clicking like button increments likes', () => {
  const blog = {
    likes: 10,
    title: 'This is a test blog',
    url: 'me.com',
    author: 'Me'
  }

  const component = render(
    <Blog blog={blog} />
  )

  const button = component.container.querySelector('button')
  fireEvent.click(button)

  const likeFn = jest.fn()
  const likeButton = component.getByText('like')
  likeButton.onclick=likeFn

  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(likeFn.mock.calls).toHaveLength(2)
})