import * as React from 'react';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Typewriter } from 'react-simple-typewriter'
import { useRouter } from 'next/router'
import { LanguageContext } from "../../context/LanguageContext";

export default function Hero() {
  const router = useRouter();
  const clickHandler = () => {
    router.push('/form')
  }
  const { lang, setLang } = React.useContext(LanguageContext);
  const [targetElement, setTarget] = React.useState(null);


  React.useEffect(() => {
    const langCheck = localStorage.getItem("lang")
   setLang(langCheck);
   setTarget(document.getElementById('target'));
  }, [])

    const handleScroll = () => {
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundImage:
          theme.palette.mode === 'light'
            ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
            : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
        backgroundSize: '100% 20%',
        backgroundRepeat: 'no-repeat',
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '90%' } }}>
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'column' },
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: 'clamp(3.5rem, 10vw, 4rem)',
              color: "#1A1A33"
            }}
          >
           { lang === "EN" && "Need a New Device?\u00a0" }
           { lang === "DE" && "Finden Sie Ihr Neues\u00a0" }
           { lang === "VN" && "Tìm kiếm của bạn mới\u00a0" }
           </Typography>
           <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'column' },
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: 'clamp(2.5rem, 10vw, 3rem)',
              color: "#1A1A33",
            }}
          >
           { lang === "EN" && "Get Tailored Picks & Top Amazon Deals!\u00a0" }
           { lang === "DE" && "Erhalten Sie maßgeschneiderte Empfehlungen und Top-Angebote bei Amazon!\u00a0" }
           { lang === "VN" && "Nhận các gợi ý phù hợp & các ưu đãi hàng đầu trên Amazon!\u00a0" }
           </Typography>

            {/* <Typography
              component="span"
              variant="h1"
              sx={{
                fontSize: 'clamp(3rem, 10vw, 4rem)',
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
              }}
            >
               <Typewriter words={['Phone!', 'Laptop!']} loop={false} cursor />
            </Typography> */}
          <Typography
            textAlign="center"
            color="text.primary"
            sx={{ alignSelf: 'center', width: { sm: '100%', md: '80%' },  fontSize: 'clamp(1rem, 5vw, 1.5rem)', color: "#333333"}}
          >
            {lang === "EN" && "Looking for the right laptop or phone? Answer a few quick questions about your needs, and we’ll recommend the best options tailored just for you. Or, explore our curated list of Amazon’s top deals on popular products with huge discounts and great reviews. Find the perfect device and save big with MyDealsFinder!"}
            {lang === "DE" && "Suchen Sie den richtigen Laptop oder das richtige Handy? Beantworten Sie ein paar kurze Fragen zu Ihren Bedürfnissen, und wir empfehlen Ihnen die besten Optionen, die genau auf Sie zugeschnitten sind. Oder stöbern Sie in unserer kuratierten Liste der besten Amazon-Angebote für beliebte Produkte mit hohen Rabatten und großartigen Bewertungen. Finden Sie das perfekte Gerät und sparen Sie viel mit MyDealsFinder!"}
            {lang === "VN" && "Bạn đang tìm kiếm chiếc laptop hoặc điện thoại phù hợp? Trả lời nhanh vài câu hỏi về nhu cầu của bạn, và chúng tôi sẽ đề xuất những lựa chọn tốt nhất được cá nhân hóa chỉ dành cho bạn. Hoặc, khám phá danh sách các ưu đãi hàng đầu trên Amazon với sản phẩm phổ biến, giảm giá lớn và đánh giá cao. Tìm thiết bị hoàn hảo và tiết kiệm lớn với MyDealsFinder!"}
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignSelf="center"
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
          >
            <Button onClick={clickHandler} variant="contained" color="primary">
            {lang === "EN" && "Find My Device"}
            {lang === "DE" && "Mein Gerät finden"}
            {lang === "VN" && "Tìm thiết bị của tôi"}
            </Button>
            <Button onClick={handleScroll} variant="contained" color="primary">
            {lang === "EN" && "Find My Deals"}
            {lang === "DE" && "Meine Angebote finden"}
            {lang === "VN" && "Tìm các ưu đãi của tôi"}
            </Button>
          </Stack>
          <Typography variant="caption" textAlign="center" sx={{ opacity: 0.8 }}>
           {lang === "EN" && 'By using the website you agree to our'}
           {lang === "DE" && 'Durch die Nutzung der Website stimmen Sie unseren:'}
           {lang === "VN" && 'Bằng cách sử dụng trang web, bạn đồng ý với:'}
            <Link href="/tos" color="primary">
              {lang === "EN" && "Terms & Conditions"}
              {lang === "DE" && "Nutzungsbedingungen"}
              {lang === "VN" && "Điều khoản sử dụng"}
            </Link>
            .
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}