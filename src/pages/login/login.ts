import { Component, OnInit } from "@angular/core";
import { NavController, AlertController } from "ionic-angular";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireAuth } from "@angular/fire/auth";
import { HomePage } from "../home/home";
import { CadastroPage } from "../cadastro/cadastro";


@Component({
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {

  label: string = 'Login';
  private loginFormGroup: FormGroup;

  constructor(private navCtrl: NavController, private alertCtrl: AlertController, private afAuth: AngularFireAuth) {}

  ngOnInit() {
    this.loginFormGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required])
    });
  }
  get email() { return this.loginFormGroup.get('email') }
  get senha() { return this.loginFormGroup.get('senha') }

  logar() {
    this.afAuth.auth.signInWithEmailAndPassword(this.email.value, this.senha.value).then(authRes => {
      this.navCtrl.push(HomePage);
    }).catch((error) => {
      if(error.code = 'auth/wrong-password'){
        const alert = this.alertCtrl.create({
          title: 'Erro',
          subTitle: 'Email ou senha incorretos',
          buttons: ['OK']
        });
        alert.present();
      }      
    });
  }

  cadastro() {
    this.navCtrl.push(CadastroPage)
  }
}