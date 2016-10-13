<?php

/* TwigBundle:Exception:exception_full.html.twig */
class __TwigTemplate_7f35ad2a6aa6626032ef44400663db5ab1ea5ed3ff3f5359daac46d9949f0237 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        // line 1
        $this->parent = $this->loadTemplate("@Twig/layout.html.twig", "TwigBundle:Exception:exception_full.html.twig", 1);
        $this->blocks = array(
            'head' => array($this, 'block_head'),
            'title' => array($this, 'block_title'),
            'body' => array($this, 'block_body'),
        );
    }

    protected function doGetParent(array $context)
    {
        return "@Twig/layout.html.twig";
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_5d4a55291cb278310b5d2e459b4adc490e13c3ca4f2731fbfb7e9075877d1668 = $this->env->getExtension("native_profiler");
        $__internal_5d4a55291cb278310b5d2e459b4adc490e13c3ca4f2731fbfb7e9075877d1668->enter($__internal_5d4a55291cb278310b5d2e459b4adc490e13c3ca4f2731fbfb7e9075877d1668_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "TwigBundle:Exception:exception_full.html.twig"));

        $this->parent->display($context, array_merge($this->blocks, $blocks));
        
        $__internal_5d4a55291cb278310b5d2e459b4adc490e13c3ca4f2731fbfb7e9075877d1668->leave($__internal_5d4a55291cb278310b5d2e459b4adc490e13c3ca4f2731fbfb7e9075877d1668_prof);

    }

    // line 3
    public function block_head($context, array $blocks = array())
    {
        $__internal_5f2e3bb2aa36685e712f0f0c433273241a1cee960acd9ea15b31f991fcf3ea46 = $this->env->getExtension("native_profiler");
        $__internal_5f2e3bb2aa36685e712f0f0c433273241a1cee960acd9ea15b31f991fcf3ea46->enter($__internal_5f2e3bb2aa36685e712f0f0c433273241a1cee960acd9ea15b31f991fcf3ea46_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "head"));

        // line 4
        echo "    <link href=\"";
        echo twig_escape_filter($this->env, $this->env->getExtension('request')->generateAbsoluteUrl($this->env->getExtension('asset')->getAssetUrl("bundles/framework/css/exception.css")), "html", null, true);
        echo "\" rel=\"stylesheet\" type=\"text/css\" media=\"all\" />
";
        
        $__internal_5f2e3bb2aa36685e712f0f0c433273241a1cee960acd9ea15b31f991fcf3ea46->leave($__internal_5f2e3bb2aa36685e712f0f0c433273241a1cee960acd9ea15b31f991fcf3ea46_prof);

    }

    // line 7
    public function block_title($context, array $blocks = array())
    {
        $__internal_7137cb7ffcf453574ca6ce77f76a97a07387e2e3d6338eab1e7230cf500182e4 = $this->env->getExtension("native_profiler");
        $__internal_7137cb7ffcf453574ca6ce77f76a97a07387e2e3d6338eab1e7230cf500182e4->enter($__internal_7137cb7ffcf453574ca6ce77f76a97a07387e2e3d6338eab1e7230cf500182e4_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "title"));

        // line 8
        echo "    ";
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["exception"]) ? $context["exception"] : $this->getContext($context, "exception")), "message", array()), "html", null, true);
        echo " (";
        echo twig_escape_filter($this->env, (isset($context["status_code"]) ? $context["status_code"] : $this->getContext($context, "status_code")), "html", null, true);
        echo " ";
        echo twig_escape_filter($this->env, (isset($context["status_text"]) ? $context["status_text"] : $this->getContext($context, "status_text")), "html", null, true);
        echo ")
";
        
        $__internal_7137cb7ffcf453574ca6ce77f76a97a07387e2e3d6338eab1e7230cf500182e4->leave($__internal_7137cb7ffcf453574ca6ce77f76a97a07387e2e3d6338eab1e7230cf500182e4_prof);

    }

    // line 11
    public function block_body($context, array $blocks = array())
    {
        $__internal_5c286a268550e99b4cc68764acb537b6519cfab5f906f45818563ebc5d359100 = $this->env->getExtension("native_profiler");
        $__internal_5c286a268550e99b4cc68764acb537b6519cfab5f906f45818563ebc5d359100->enter($__internal_5c286a268550e99b4cc68764acb537b6519cfab5f906f45818563ebc5d359100_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "body"));

        // line 12
        echo "    ";
        $this->loadTemplate("@Twig/Exception/exception.html.twig", "TwigBundle:Exception:exception_full.html.twig", 12)->display($context);
        
        $__internal_5c286a268550e99b4cc68764acb537b6519cfab5f906f45818563ebc5d359100->leave($__internal_5c286a268550e99b4cc68764acb537b6519cfab5f906f45818563ebc5d359100_prof);

    }

    public function getTemplateName()
    {
        return "TwigBundle:Exception:exception_full.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  78 => 12,  72 => 11,  58 => 8,  52 => 7,  42 => 4,  36 => 3,  11 => 1,);
    }
}
/* {% extends '@Twig/layout.html.twig' %}*/
/* */
/* {% block head %}*/
/*     <link href="{{ absolute_url(asset('bundles/framework/css/exception.css')) }}" rel="stylesheet" type="text/css" media="all" />*/
/* {% endblock %}*/
/* */
/* {% block title %}*/
/*     {{ exception.message }} ({{ status_code }} {{ status_text }})*/
/* {% endblock %}*/
/* */
/* {% block body %}*/
/*     {% include '@Twig/Exception/exception.html.twig' %}*/
/* {% endblock %}*/
/* */
