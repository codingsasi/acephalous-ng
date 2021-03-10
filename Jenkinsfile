pipeline {
    agent any
    options {
        ansiColor('xterm')
    }
    stages {
        stage('Build') {
            steps {
                echo 'Building...'
                sh 'npm install --ansi'
                sh 'echo "export const environment = { production: true, apiUrl: \'https://abh.ai/\' };" > src/environments/environment.prod.ts'
                sh 'npm run build --prod --ansi'
            }
        }
        stage('Coding Standards') {
            steps {
                echo 'Checking coding standards...'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing...'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying...'
                sh 'ssh ubuntu@192.168.0.25 rm -rf /home/ubuntu/Sites/ng'
                sh 'scp -r dist/ng ubuntu@192.168.0.25:/home/ubuntu/Sites/'
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}
