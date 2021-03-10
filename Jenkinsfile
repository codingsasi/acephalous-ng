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
                writeFile file: 'src/environments/environment.prod.ts', text: "export const environment = { production: true, apiUrl: 'https://abh.ai/' };"
                sh 'npm run build -- --prod'
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
}
