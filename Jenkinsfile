pipeline {
    agent any

    environment {
        NODE_VERSION = '20.11.10'
        FIREBASE_TOKEN = credentials('FIREBASE_TOKEN')  // Ensure this is added in Jenkins credentials
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', 
                    url: 'https://github.com/username/repo.git'  // Use HTTPS URL
            }
        }

        stage('Setup Node.js') {
            steps {
                sh "nvm install $NODE_VERSION"
                sh "nvm use $NODE_VERSION"
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'rm -rf node_modules package-lock.json build'
                sh 'npm cache clean --force'
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy to Firebase') {
            steps {
                sh 'npx firebase deploy --token $FIREBASE_TOKEN'
            }
        }
    }

    post {
        success {
            echo '✅ Deployment Successful!'
        }
        failure {
            echo '❌ Deployment Failed. Check the logs.'
        }
    }
}
