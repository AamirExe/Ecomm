const layout = require('./adminLayout');
const checkErr = require('../../routes/admin/helper')
module.exports = ({ errors }) => {
    return layout({
      content: `
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-one-quarter">
              <form method="POST">
                <h1 class="title">Sign Up</h1>
                <div class="field">
                  <label class="label">Email</label>
                  <input required class="input" placeholder="Email" name="email" />
                  <p class="help is-danger">${checkErr(errors, 'email')}</p>
                </div>
                <div class="field">
                  <label class="label">Password</label>
                  <input required class="input" placeholder="Password" name="pwd" type="password" />
                  <p class="help is-danger">${checkErr(errors, 'pwd')}</p>
                </div>
                <div class="field">
                  <label class="label">Password Confirmation</label>
                  <input required class="input" placeholder="Password Confirmation" name="cnfPwd" type="password" />
                  <p class="help is-danger">${checkErr(
                    errors,
                    'cnfPwd'
                  )}</p>
                </div>
                <button class="button is-primary">Submit</button>
              </form>
              <a href="/signin">Have an account? Sign In</a>
            </div>
          </div>
        </div>
      `
    });}
