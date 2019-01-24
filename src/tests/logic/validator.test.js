import { createValidator } from '../../logic/validator';

describe('validator', () => {
  it('validate register schema', () => {
    expect(
      createValidator('register')({
        name: 'Jack',
        emailId: 'jack@gmail.com',
        password: 'password'
      })
    ).toMatchObject({
      name: 'name must be at least 6 characters'
    });

    expect(
      createValidator('register')({
        name: 'Jack',
        emailId: 'jack@gmail.com',
        password: ''
      })
    ).toBeDefined();

    expect(
      createValidator('register')({
        name: 'Jack Jim',
        emailId: 'jack@gmail.com',
        password: 'password'
      })
    ).toBeFalsy();
  });

  it('validate login schema', () => {
    expect(
      createValidator('login')({
        name: 'Jack',
        password: ''
      })
    ).toBeDefined();
  });

  it('validate forgotPassword schema', () => {
    expect(
      createValidator('forgotPassword')({
        emailId: ''
      })
    ).toBeDefined();
  });

  it('validate resetPassword schema', () => {
    expect(
      createValidator('resetPassword')({
        password: ''
      })
    ).toBeDefined();
  });

  it('validate project schema', () => {
    expect(
      createValidator('project')({
        name: ''
      })
    ).toBeDefined();
  });

  it('validate task schema', () => {
    expect(
      createValidator('task')({
        name: ''
      })
    ).toBeDefined();
  });

  /*
  it('validate logTime schema', () => {
    expect(
      createValidator('logTime')({
        name: 'Jack',
        password: ''
      })
    ).toBeDefined();
  });
  */
});
