// tests/api.spec.js

const { test, expect, request } = require('@playwright/test');

test.describe('API Testing - JSONPlaceholder', () => {

  const BASE_URL = 'https://jsonplaceholder.typicode.com';

  // TC_008: GET - Users list எடுக்கோம்
  test('TC_008: GET - Users list successfully return ஆகணும்', async () => {
    const apiContext = await request.newContext();

    const response = await apiContext.get(`${BASE_URL}/users`);

    expect(response.status()).toBe(200);

    const body = await response.json();

    // 10 users return ஆகணும்
    expect(body.length).toBe(10);
    expect(body[0].id).toBeDefined();
    expect(body[0].email).toBeDefined();

    console.log(`✅ TC_008: Users count: ${body.length}`);
    console.log('✅ TC_008: GET Users — PASSED');
  });

  // TC_009: GET - Single user எடுக்கிறோம்
  test('TC_009: GET - Single user details return ஆகணும்', async () => {
    const apiContext = await request.newContext();

    const response = await apiContext.get(`${BASE_URL}/users/1`);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.id).toBe(1);
    expect(body.name).toBeDefined();
    expect(body.email).toBeDefined();

    console.log(`✅ TC_009: User name: ${body.name}`);
    console.log('✅ TC_009: GET Single User — PASSED');
  });

  // TC_010: GET - Invalid user 404
  test('TC_010: GET - Invalid user 404 return ஆகணும்', async () => {
    const apiContext = await request.newContext();

    const response = await apiContext.get(`${BASE_URL}/users/9999`);

    expect(response.status()).toBe(404);

    console.log('✅ TC_010: GET Invalid User 404 — PASSED');
  });

  // TC_011: POST - New post create பண்றோம்
  test('TC_011: POST - New post successfully create ஆகணும்', async () => {
    const apiContext = await request.newContext();

    const newPost = {
      title: 'Micheal Sachin Test Post',
      body: 'This is a test post by automation framework',
      userId: 1
    };

    const response = await apiContext.post(`${BASE_URL}/posts`, {
      data: newPost
    });

    expect(response.status()).toBe(201);

    const body = await response.json();

    expect(body.title).toBe('Micheal Sachin Test Post');
    expect(body.id).toBeDefined();

    console.log(`✅ TC_011: Created Post ID: ${body.id}`);
    console.log('✅ TC_011: POST Create Post — PASSED');
  });

  // TC_012: PUT - Post update பண்றோம்
  test('TC_012: PUT - Post successfully update ஆகணும்', async () => {
    const apiContext = await request.newContext();

    const updatedPost = {
      title: 'Updated by Micheal Sachin',
      body: 'Updated automation test post',
      userId: 1
    };

    const response = await apiContext.put(`${BASE_URL}/posts/1`, {
      data: updatedPost
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.title).toBe('Updated by Micheal Sachin');
    expect(body.id).toBe(1);

    console.log(`✅ TC_012: Updated title: ${body.title}`);
    console.log('✅ TC_012: PUT Update Post — PASSED');
  });

  // TC_013: DELETE - Post delete பண்றோம்
  test('TC_013: DELETE - Post successfully delete ஆகணும்', async () => {
    const apiContext = await request.newContext();

    const response = await apiContext.delete(`${BASE_URL}/posts/1`);

    expect(response.status()).toBe(200);

    console.log('✅ TC_013: DELETE Post — PASSED');
  });

});
