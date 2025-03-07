<template>
    <div>
        <div>
            <h1>Log In</h1>
            <p>Sign in to your account to access your assets</p>
        </div>
        <form >
            <div>
                <label for="email">Email Adress</label>
                <div>
                    <input type="text" id="email" name="email" placeholder="youremail@example.com">
                    <Mail></Mail>
                </div>
            </div>

            <div>
                <div>
                    <label for="password"></label>
                    <a href="#">Forgot your password? </a>
                </div>
                <div>
                    <input type="password" id="password" name="password" placeholder="UniPlace123">
                    <Lock></Lock>
                    <button > <!--Eyeoff--></button>
                </div>
            </div>

            <button>
                <span>Sign In</span>
                <ArrowRight></ArrowRight>
            </button>

            <div>
                <div>
                    <div>
                        <div></div>
                    </div>
                    <div>
                        <span>Or continue with</span>
                    </div>
                </div>
                <div>
                    <button>
                        <span>
                            <a href="#">Create account</a>
                        </span>
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>
