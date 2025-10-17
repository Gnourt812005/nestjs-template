#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=====================================${NC}"
echo -e "${BLUE}    NestJS Testing Setup Script      ${NC}"
echo -e "${BLUE}=====================================${NC}"
echo ""

echo -e "${YELLOW}Select Testing Setup:${NC}"
echo "1) Basic Testing (Already included with NestJS)"
echo "2) E2E Testing Enhanced"
echo "3) Testing with Coverage Tools"
echo "4) Testing with Mocking (jest-mock-extended)"
echo "5) Integration Testing (testcontainers)"
echo "6) API Testing (supertest + chai)"
echo "7) Complete Testing Setup"
echo "8) Exit"
echo ""

read -p "Enter your choice (1-8): " choice

case $choice in
  1)
    echo -e "${GREEN}✓ Basic testing is already configured!${NC}"
    echo ""
    echo -e "${YELLOW}Available commands:${NC}"
    echo "yarn test        - Run unit tests"
    echo "yarn test:watch  - Run tests in watch mode"
    echo "yarn test:cov    - Run tests with coverage"
    echo "yarn test:e2e    - Run end-to-end tests"
    ;;
  2)
    echo -e "${GREEN}Installing E2E testing enhancements...${NC}"
    yarn add -D @nestjs/testing supertest @types/supertest
    echo -e "${GREEN}✓ E2E testing packages installed!${NC}"
    echo ""
    echo -e "${YELLOW}Usage example (test/app.e2e-spec.ts):${NC}"
    echo "import * as request from 'supertest';"
    echo "import { Test } from '@nestjs/testing';"
    echo "import { AppModule } from './../src/app.module';"
    echo ""
    echo "describe('AppController (e2e)', () => {"
    echo "  let app;"
    echo ""
    echo "  beforeAll(async () => {"
    echo "    const moduleFixture = await Test.createTestingModule({"
    echo "      imports: [AppModule],"
    echo "    }).compile();"
    echo ""
    echo "    app = moduleFixture.createNestApplication();"
    echo "    await app.init();"
    echo "  });"
    echo ""
    echo "  it('/ (GET)', () => {"
    echo "    return request(app.getHttpServer())"
    echo "      .get('/')"
    echo "      .expect(200);"
    echo "  });"
    echo "});"
    ;;
  3)
    echo -e "${GREEN}Installing Coverage tools...${NC}"
    yarn add -D jest-coverage-badges jest-html-reporter
    echo -e "${GREEN}✓ Coverage tools installed!${NC}"
    echo ""
    echo -e "${YELLOW}Add to package.json scripts:${NC}"
    echo "\"test:cov:badges\": \"yarn test:cov && jest-coverage-badges\""
    echo ""
    echo -e "${YELLOW}For HTML reports, add to jest config:${NC}"
    echo "reporters: ["
    echo "  'default',"
    echo "  ['jest-html-reporter', {"
    echo "    pageTitle: 'Test Report',"
    echo "    outputPath: 'test-report.html'"
    echo "  }]"
    echo "]"
    ;;
  4)
    echo -e "${GREEN}Installing Mocking libraries...${NC}"
    yarn add -D jest-mock-extended @types/jest
    echo -e "${GREEN}✓ Mocking libraries installed!${NC}"
    echo ""
    echo -e "${YELLOW}Usage example:${NC}"
    echo "import { mock, mockReset } from 'jest-mock-extended';"
    echo ""
    echo "const mockRepository = mock<UserRepository>();"
    echo ""
    echo "beforeEach(() => {"
    echo "  mockReset(mockRepository);"
    echo "});"
    echo ""
    echo "it('should call repository', () => {"
    echo "  mockRepository.findOne.mockResolvedValue(user);"
    echo "});"
    ;;
  5)
    echo -e "${GREEN}Installing Testcontainers for integration testing...${NC}"
    yarn add -D testcontainers
    echo -e "${GREEN}✓ Testcontainers installed!${NC}"
    echo ""
    echo -e "${YELLOW}Usage: Spin up real database/services for tests${NC}"
    echo "import { GenericContainer } from 'testcontainers';"
    echo ""
    echo "const container = await new GenericContainer('postgres')"
    echo "  .withExposedPorts(5432)"
    echo "  .start();"
    echo ""
    echo -e "${YELLOW}Supports: PostgreSQL, MongoDB, Redis, Kafka, etc.${NC}"
    ;;
  6)
    echo -e "${GREEN}Installing API Testing tools...${NC}"
    yarn add -D supertest chai @types/chai
    echo -e "${GREEN}✓ API Testing tools installed!${NC}"
    echo ""
    echo -e "${YELLOW}Usage with Chai assertions:${NC}"
    echo "import { expect } from 'chai';"
    echo "import * as request from 'supertest';"
    echo ""
    echo "const response = await request(app.getHttpServer())"
    echo "  .get('/users')"
    echo "  .expect(200);"
    echo ""
    echo "expect(response.body).to.be.an('array');"
    echo "expect(response.body).to.have.lengthOf.at.least(1);"
    ;;
  7)
    echo -e "${GREEN}Installing Complete Testing Setup...${NC}"
    yarn add -D @nestjs/testing supertest @types/supertest jest-mock-extended jest-coverage-badges jest-html-reporter testcontainers chai @types/chai @types/jest
    echo -e "${GREEN}✓ Complete testing stack installed!${NC}"
    echo ""
    echo -e "${YELLOW}Installed packages:${NC}"
    echo "✓ E2E Testing (supertest)"
    echo "✓ Mocking (jest-mock-extended)"
    echo "✓ Coverage tools (badges, HTML reporter)"
    echo "✓ Integration testing (testcontainers)"
    echo "✓ API assertions (chai)"
    echo ""
    echo -e "${YELLOW}Recommended test structure:${NC}"
    echo "test/"
    echo "├── unit/           # Unit tests"
    echo "├── integration/    # Integration tests"
    echo "├── e2e/           # End-to-end tests"
    echo "└── fixtures/      # Test data"
    ;;
  8)
    echo -e "${YELLOW}Exiting without installing testing packages.${NC}"
    exit 0
    ;;
  *)
    echo -e "${RED}Invalid choice. Please run the script again.${NC}"
    exit 1
    ;;
esac

echo ""
echo -e "${GREEN}=====================================${NC}"
echo -e "${GREEN}   Testing setup completed!          ${NC}"
echo -e "${GREEN}=====================================${NC}"
echo ""
echo -e "${YELLOW}Testing best practices:${NC}"
echo "1. Aim for 80%+ code coverage"
echo "2. Write tests before fixing bugs (TDD)"
echo "3. Use descriptive test names"
echo "4. Mock external dependencies"
echo "5. Run tests before committing"
