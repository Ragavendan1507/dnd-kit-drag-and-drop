pipeline {
    agent any

    environment {
        NODE_VERSION = '20.11.10'
        FIREBASE_TOKEN = credentials('FIREBASE_TOKEN')
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'pre-development', 
                    url: 'https://github.com/Ragavendan1507/dnd-kit-drag-and-drop.git' 
            }
        }

        stage('Setup Node.js') {
            steps {
                sh ". ~/.nvm/nvm.sh && nvm install $NODE_VERSION && nvm use $NODE_VERSION"
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
