FROM public.ecr.aws/lambda/nodejs:16

COPY . .

RUN npm install
RUN npm run prisma:gen
RUN npm run build:sls

CMD ["dist/lambda.handler"]
