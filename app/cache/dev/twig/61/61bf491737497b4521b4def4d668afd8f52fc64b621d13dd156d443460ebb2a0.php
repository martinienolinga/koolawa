<?php

/* TwigBundle:Exception:error.txt.twig */
class __TwigTemplate_473834706d7e34889a24f5ae4d0409578a4083020f1671eadd52ce72cc5d9382 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_c1cdba7bc16b39f36af0a565a646a99bdf671f7466b1c44abac53d8c21a66591 = $this->env->getExtension("native_profiler");
        $__internal_c1cdba7bc16b39f36af0a565a646a99bdf671f7466b1c44abac53d8c21a66591->enter($__internal_c1cdba7bc16b39f36af0a565a646a99bdf671f7466b1c44abac53d8c21a66591_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "TwigBundle:Exception:error.txt.twig"));

        // line 1
        echo "Oops! An Error Occurred
=======================

The server returned a \"";
        // line 4
        echo (isset($context["status_code"]) ? $context["status_code"] : $this->getContext($context, "status_code"));
        echo " ";
        echo (isset($context["status_text"]) ? $context["status_text"] : $this->getContext($context, "status_text"));
        echo "\".

Something is broken. Please let us know what you were doing when this error occurred.
We will fix it as soon as possible. Sorry for any inconvenience caused.
";
        
        $__internal_c1cdba7bc16b39f36af0a565a646a99bdf671f7466b1c44abac53d8c21a66591->leave($__internal_c1cdba7bc16b39f36af0a565a646a99bdf671f7466b1c44abac53d8c21a66591_prof);

    }

    public function getTemplateName()
    {
        return "TwigBundle:Exception:error.txt.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  27 => 4,  22 => 1,);
    }
}
/* Oops! An Error Occurred*/
/* =======================*/
/* */
/* The server returned a "{{ status_code }} {{ status_text }}".*/
/* */
/* Something is broken. Please let us know what you were doing when this error occurred.*/
/* We will fix it as soon as possible. Sorry for any inconvenience caused.*/
/* */
