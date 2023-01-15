pipeline {
    agent any 
    stages {
        stage('install dependecies') { 
            steps {
              bat  'npm install'
            }
        }
        stage('Build') { 
            steps {
              bat  'npm run buildgp'
            }
        }
        stage('Deploy') { 
            steps {
              bat  "npm run deploy"
            }
        }
    }
}