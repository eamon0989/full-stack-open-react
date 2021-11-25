import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

// check the event handler is called with the right details
// e.g. id='author' can be accessed with:
// const author = component.container.querySelector('#author')

test('event handler is called with correct details', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm submitNewBlog={createBlog} />
  )

  const input = component.container.querySelector('#title')
  const form = component.container.querySelector('form')

  fireEvent.change(input, {
    target: { value: 'This is a new title' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('This is a new title')
})