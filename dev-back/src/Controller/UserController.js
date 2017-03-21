const user = require('../Model/Entity/User.js');
const emailValidator = require('email-validator');
const passwordHash = require('password-hash');
//npm install password-hash

function UserController(){

}

//validate that email is valid and verifies that email doesn't exist in database
UserController.prototype.emailValidator = function (email){

    if (emailValidator.validate(email)){
        // check that email is unique
        db.user.find({email: email}, (error, result)=>{
            if(error){
                throw error;
            }
            //if result is not empty list  !=[]
            return !result.length ? true : "Votre email existe déjà";
        });
    }else{
        return "Votre email n'est pas valide";
    }
};

UserController.prototype.passwordValidator = function(password){

    //password contains one digit, one lowercase letter, one capital letter, one special character, > 5 characters
    let regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!$#?]).{5,}/;
    if(regex.test(password)){
        return true;
    }else{
        return "Le password doit contenir 5 caractères minimum, dont une majuscule, une minuscule, un chiffre et un caractère spécial(!, $, #,?)";
    }

};

/*UserController.prototype.passwordConfirm = function(password, confirmedPassword){
    return (password === confirmedPassword);
};*/

//get register view
UserController.prototype.registerAction = function(req, res){
    res.render('/register', {});
};

//on submit
UserController.prototype.signUpAction = function(req, res){
    let post = req.body;
    let _self = this;
    if (_self.emailValidator(post.email) === true ){

        if( post.password === post.passwordConfirmed ){
            db.user.insert({
                email: post.email,
                password: passwordHash.generate(post.password)
            });
            res.redirect('/connect');
        }else {
            console.log("Le mot de passe doit etre le meme");
        }

    }else{
        let error = _self.emailValidator(post.email);
        console.log(error);
    }
};

//get connect view
UserController.prototype.connectAction = function(req, res){
    res.render('/connect', {});
};

//on submit
UserController.prototype.loginAction = function(req, res){
    let post = req.body;
    let user = db.user.find({
        email: post.email
    });
    if (user){
        if ( passwordHash.verify(post.password, user.password) ){
            app.locals.user = user; //localStorage.setItem('user', user);
            res.redirect('/');
        } else {
            console.log('Votre mot de passe est incorrect');
        }
    }else{
        console.log('You have to register first');
    }
};

UserController.prototype.logoutAction = function(req, res){
    //TODO
    res.redirect('/connect');
};

//get index view
UserController.prototype.indexAction = function(req, res){
    //TODO
    res.render('/', {});
};

module.exports = UserController();