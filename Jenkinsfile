pipeline {
    agent any 
    stages {
        stage('Build') { 
            steps {
              sh  'ng build --prod --base-href "https://Giovanny-valde.github.io/Calentana_Front/"'
            }
        }
        stage('Deploy') { 
            steps {
              sh  "ngh --dir dist/calentana-front"
            }
        }
    }
}